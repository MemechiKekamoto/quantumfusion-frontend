# QuantumFusion Portal

Welcome to the QuantumFusion Portal, your gateway to interacting with the QuantumFusion network. This portal offers a seamless view and interaction layer directly from your browser.

Access the hosted application at [QuantumFusion Frontend](https://github.com/MemechiKekamoto/quantumfusion-frontend/)

## Overview

This repository is organized into several packages, each representing a specific application. It is designed to be user-friendly and easily customizable, making it ideal for both developers and end-users.

## Development

We welcome contributions from the community!

To begin, note that this repository uses yarn workspaces to manage dependencies. It is crucial to use yarn for installing dependencies to avoid issues that can arise from using npm.

### Getting Started

Follow these steps to set up the project locally:

1. Clone the repository:
```bash
git clone https://github.com/MemechiKekamoto/quantumfusion-frontend.git
cd quantumfusion-frontend
```
2. Ensure you have a recent LTS version of Node.js (Node >= 16) installed.([Download Node.js](https://nodejs.org/en/)).
3. Ensure you have Yarn installed (Yarn >= 1.22).([Install Yarn](https://yarnpkg.com/docs/install)).
4. Install the dependencies:
```bash
yarn install
```
5. Launch the UI (assuming you have a local QuantumFusion Node running):
```bash
yarn run start
```
6. Access the UI via [http://localhost:3000](http://localhost:3000)

### Configuration

To add support for your chain to the UI, customize the local configuration (API types, settings, logos) in the [apps-config package](/packages/apps-config#README.md). This includes detailed instructions on what needs to be configured and where.

## Learn More

For further details, refer to the [QuantumFusion Frontend repository](https://github.com/MemechiKekamoto/quantumfusion-frontend) and the [Substrate Documentation](https://docs.substrate.io/).