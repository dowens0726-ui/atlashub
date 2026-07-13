import {
  businesses,
  vehicles,
} from "@/app/data";

import type {
  PlayerProfile,
} from "@/app/types";

import {
  getAtlasVehicleScore,
} from "@/app/services/atlas-score.service";

import {
  canDisplayVehiclePrice,
} from "@/app/services/vehicle-data";

import {
  getBusinessScore,
} from "@/app/services/scoring.service";

import type {
  AtlasRecommendation,
} from "./recommendation.engine";


const NEUTRAL_SCORE =
  50;


function clamp(
  value: number
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        value
      )
    )
  );
}


function getVehicleRecommendation(
  profile: PlayerProfile
): AtlasRecommendation | null {
  const ownedVehicles =
    new Set(
      profile.ownedVehicles
    );

  const availableVehicles =
    vehicles.filter(
      (
        vehicle
      ) =>
        !ownedVehicles.has(
          vehicle.slug
        )
    );

  const rankedVehicles =
    availableVehicles
      .map(
        (
          vehicle
        ) => {
          const atlasScore =
            getAtlasVehicleScore(
              vehicle
            );

          let score =
            0;

          let weight =
            0;

          const reasons:
            string[] = [];


          const overallScore =
            atlasScore.overall ??
            NEUTRAL_SCORE;

          score +=
            overallScore *
            0.4;

          weight +=
            0.4;


          if (
            atlasScore.overall !==
              null &&
            atlasScore.overall >=
              80
          ) {
            reasons.push(
              "High Atlas performance rating."
            );
          }


          if (
            atlasScore.overall ===
            null
          ) {
            reasons.push(
              "Performance data is still provisional."
            );
          }


          if (
            profile.playstyle ===
            "solo"
          ) {
            const beginnerScore =
              atlasScore.beginner ??
              NEUTRAL_SCORE;

            score +=
              beginnerScore *
              0.15;

            weight +=
              0.15;


            if (
              atlasScore.beginner !==
                null &&
              atlasScore.beginner >=
                80
            ) {
              reasons.push(
                "Strong solo-friendly performance."
              );
            }


            if (
              atlasScore.beginner ===
              null
            ) {
              reasons.push(
                "Solo suitability is not fully confirmed."
              );
            }
          }


          const hasConfirmedPrice =
            canDisplayVehiclePrice(
              vehicle
            );


          if (
            hasConfirmedPrice
          ) {
            if (
              vehicle.price <=
              profile.cash
            ) {
              const affordability =
                100 -
                (
                  vehicle.price /
                  Math.max(
                    profile.cash,
                    1
                  )
                ) *
                  50;

              score +=
                clamp(
                  affordability
                ) *
                0.15;

              weight +=
                0.15;

              reasons.push(
                "Fits your current financial position."
              );
            } else {
              score +=
                35 *
                0.15;

              weight +=
                0.15;

              reasons.push(
                "Currently exceeds your available cash."
              );
            }


            if (
              vehicle.price >
              500000
            ) {
              score +=
                10;

              reasons.push(
                "Represents a meaningful upgrade."
              );
            }


            if (
              profile.cash >
                2000000 &&
              vehicle.price <
                100000
            ) {
              score -=
                25;
            }
          } else {
            score +=
              NEUTRAL_SCORE *
              0.15;

            weight +=
              0.15;

            reasons.push(
              "Purchase price has not been confirmed."
            );
          }


          const normalizedScore =
            weight >
            0
              ? score /
                weight
              : NEUTRAL_SCORE;


          return {
            vehicle,

            confidence:
              clamp(
                normalizedScore
              ),

            reasons:
              Array.from(
                new Set(
                  reasons
                )
              ),
          };
        }
      )
      .sort(
        (
          firstResult,
          secondResult
        ) =>
          secondResult.confidence -
          firstResult.confidence
      );


  const best =
    rankedVehicles[0];


  if (!best) {
    return null;
  }


  return {
    id:
      `vehicle:${best.vehicle.slug}`,

    title:
      `Buy the ${best.vehicle.name}`,

    summary:
      best.reasons.length >
      0
        ? best.reasons.join(
            " "
          )
        : "Atlas identified this vehicle as the strongest current fit.",

    category:
      "vehicle",

    priority:
      "medium",

    confidence:
      best.confidence,

    href:
      `/vehicles/${best.vehicle.slug}`,
  };
}


function getBusinessRecommendation(
  profile: PlayerProfile
): AtlasRecommendation | null {
  const ownedBusinesses =
    new Set(
      profile.ownedBusinesses
    );

  const rankedBusinesses =
    businesses
      .filter(
        (
          business
        ) =>
          !ownedBusinesses.has(
            business.slug
          )
      )
      .map(
        (
          business
        ) => {
          const score =
            getBusinessScore(
              business
            );

          let confidence =
            score.overall *
            0.4;

          const reasons:
            string[] = [];


          confidence +=
            business.incomePotential *
            0.25;


          if (
            business.incomePotential >=
            80
          ) {
            reasons.push(
              "Strong income potential."
            );
          }


          if (
            profile.playstyle ===
              "solo" &&
            business.soloFriendly
          ) {
            confidence +=
              15;

            reasons.push(
              "Matches your solo empire strategy."
            );
          }


          if (
            business.price <=
            profile.cash
          ) {
            confidence +=
              10;

            reasons.push(
              "Affordable with current funds."
            );
          }


          return {
            business,

            confidence:
              clamp(
                confidence
              ),

            reasons,
          };
        }
      )
      .sort(
        (
          firstResult,
          secondResult
        ) =>
          secondResult.confidence -
          firstResult.confidence
      );


  const best =
    rankedBusinesses[0];


  if (!best) {
    return null;
  }


  return {
    id:
      `business:${best.business.slug}`,

    title:
      `Buy the ${best.business.name}`,

    summary:
      best.reasons.join(
        " "
      ),

    category:
      "business",

    priority:
      "high",

    confidence:
      best.confidence,

    estimatedProfit:
      best.business.incomePotential,

    href:
      `/data/businesses/${best.business.slug}`,
  };
}


export function getPersonalPicks(
  profile: PlayerProfile
): AtlasRecommendation[] {
  return [
    getBusinessRecommendation(
      profile
    ),

    getVehicleRecommendation(
      profile
    ),
  ]
    .filter(
      (
        recommendation
      ): recommendation is AtlasRecommendation =>
        Boolean(
          recommendation
        )
    )
    .sort(
      (
        firstRecommendation,
        secondRecommendation
      ) =>
        secondRecommendation.confidence -
        firstRecommendation.confidence
    );
}