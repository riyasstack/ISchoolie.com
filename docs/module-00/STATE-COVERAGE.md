# Per-screen state coverage

11 November 2026. 180 contracts, 1620 applicable state views and 180 explicit N/A decisions. The web matrix is /design-lab/states; individual variants use /design-lab/states/ID/State. All 138 native-eligible detail routes expose the same state contract.

Temporary loading/empty/error/offline/conflict states retain the mounted task behind a hidden boundary. Restriction/expiry clear it. Recovery keeps the task generation unless the user discards it; scoped-context changes always reset it. This is local presentation logic, not authorization, secure caching or a server merge. Validation presents the actual task instead of manufacturing fields. Reviewed explicitly says it is not proof of validation; the real task control performs validation.

Generated HTML and reducer checks do not establish hydrated focus, browser interactions or native device parity. Acceptance remains zero. screen-state-contracts.json contains headings, actions, retention rules and N/A reasons for every ID; native-screen-plans.json identifies native routing patterns.

| Screen | Applicable states | N/A | Native |
|---|---|---|---|
| PUB-01 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| PUB-02 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| PUB-03 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| PUB-04 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| PUB-05 | Ready, Loading, Empty, Error, Offline, Conflict, Validation, Reviewed | Restricted, Expired | Web-only |
| PUB-06 | Ready, Loading, Empty, Error, Offline, Conflict, Reviewed | Validation, Restricted, Expired | Web-only |
| PUB-07 | Ready, Loading, Empty, Error, Offline, Conflict, Reviewed | Validation, Restricted, Expired | Web-only |
| PUB-08 | Ready, Loading, Empty, Error, Offline, Conflict, Validation, Reviewed | Restricted, Expired | Web-only |
| PUB-09 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| PUB-10 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| PUB-11 | Ready, Loading, Empty, Error, Offline, Conflict, Reviewed | Validation, Restricted, Expired | Web-only |
| PUB-12 | Ready, Loading, Empty, Error, Offline, Conflict, Validation, Reviewed | Restricted, Expired | Web-only |
| PUB-13 | Ready, Loading, Empty, Error, Offline, Conflict, Reviewed | Validation, Restricted, Expired | Web-only |
| PUB-14 | Ready, Loading, Empty, Error, Offline, Conflict, Validation, Reviewed | Restricted, Expired | Web-only |
| PUB-15 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| PUB-16 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| PUB-17 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| PUB-18 | Ready, Loading, Empty, Error, Offline, Conflict, Validation, Reviewed | Restricted, Expired | Web-only |
| PUB-19 | Ready, Loading, Empty, Error, Offline, Conflict, Validation, Reviewed | Restricted, Expired | Web-only |
| PUB-20 | Ready, Loading, Empty, Error, Offline, Conflict, Validation, Reviewed | Restricted, Expired | Web-only |
| PUB-21 | Ready, Loading, Empty, Error, Offline, Conflict, Validation, Reviewed | Restricted, Expired | Web-only |
| PUB-22 | Ready, Loading, Empty, Error, Offline, Conflict | Validation, Reviewed, Restricted, Expired | Web-only |
| AUTH-01 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-02 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-03 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-04 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-05 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-06 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-07 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-08 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-09 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-10 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-11 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-12 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-13 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-14 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-15 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| AUTH-16 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-01 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-02 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-03 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| APP-04 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-05 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-06 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-07 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-08 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| APP-09 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Reviewed | Validation | Authored; device unverified |
| APP-10 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Reviewed | Validation | Authored; device unverified |
| APP-11 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-12 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| APP-13 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| APP-14 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-15 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| APP-16 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-17 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Reviewed | Validation | Authored; device unverified |
| APP-18 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| APP-19 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| STU-01 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-02 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| STU-03 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| STU-04 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-05 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-06 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| STU-07 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Reviewed | Validation | Authored; device unverified |
| STU-08 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-09 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-10 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-11 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-12 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-13 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| STU-14 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-15 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-16 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-17 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-18 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-19 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| STU-20 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-21 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Reviewed | Validation | Authored; device unverified |
| STU-22 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| STU-23 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| STU-24 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-01 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-02 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-03 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-04 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-05 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-06 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-07 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-08 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-09 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-10 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-11 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-12 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-13 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-14 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-15 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-16 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-17 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-18 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| EDU-19 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-20 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Reviewed | Validation | Authored; device unverified |
| EDU-21 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-22 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| EDU-23 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PAR-01 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-02 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-03 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-04 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-05 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-06 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-07 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-08 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-09 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-10 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PAR-11 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PAR-12 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PAR-13 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PAR-14 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PAR-15 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-01 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| INS-02 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-03 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-04 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-05 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| INS-06 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| INS-07 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-08 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| INS-09 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| INS-10 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-11 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-12 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-13 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-14 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-15 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-16 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| INS-17 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-18 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-19 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-20 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Reviewed | Validation | Authored; device unverified |
| INS-21 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-22 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-23 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-24 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-25 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-26 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Reviewed | Validation | Authored; device unverified |
| INS-27 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-28 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| INS-29 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| INS-30 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PRO-01 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PRO-02 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PRO-03 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PRO-04 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PRO-05 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PRO-06 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PRO-07 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PRO-08 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PRO-09 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| PRO-10 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Authored; device unverified |
| PRO-11 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict | Validation, Reviewed | Authored; device unverified |
| ADM-01 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-02 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-03 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-04 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-05 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-06 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-07 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-08 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-09 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-10 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-11 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-12 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-13 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-14 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-15 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-16 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-17 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-18 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-19 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
| ADM-20 | Ready, Loading, Empty, Error, Restricted, Expired, Offline, Conflict, Validation, Reviewed |  | Web-only |
