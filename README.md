# Rocephin (Ceftriaxone) IM Calculator

A fast, offline-capable clinical utility designed to calculate the exact draw-up volume for intramuscular Ceftriaxone (Rocephin) injections based on ordered dose, vial size, and reconstituted yield.

## Features
* **Clinical Safety Locks:** Prevents calculations if the inputted dose exceeds the 1000mg maximum limit.
* **Dynamic Split-Dosing:** Automatically calculates if the total volume exceeds safe injection site limits for infants, toddlers, or older children, and recommends split doses.
* **Transparent Calculations:** Provides a step-by-step mathematical breakdown of the concentration and volume derivation.

## Tech Stack
Built with React, Tailwind CSS, and Vite. 

## Local Development
To run this project locally:
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the local development server

---
**Disclaimer:** This application is strictly an educational tool. All calculations must be independently verified against institutional protocols and clinical guidelines prior to administration.