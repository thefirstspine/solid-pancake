# Solid Pancake

Solid Pancakes is an event-based consumer that tracks usages on the TFS products.

## Installation

```
npm ci
```

## Running the app

```
npm run start
```

## Build & run for production

```
npm run build
node dist/main.js
```

## Configuration

See the configuration keys with the [Ansible playbook](https://github.com/thefirstspine/ansible/blob/master/volume/playbooks/deploy-solid-pancake.yaml)

To help you configure your local environment to generate a dotenv file you can use the [configurator](https://github.com/thefirstspine/configurator) using this command:

```
node configurator.js create solid-pancake --conf-path [local copy of ansible volume]/conf --force-http true
```

## Sessions & events concepts

### About the sessions

Each tracking starts with a session. A session is considered to be a usage by anyone on a product. Each session is associated with a product, a version, and a date.

### About the events

Next, the tracking goes with the events. An event can be anything (a view, a click, etc.) and is registered to record the actions of the user within the session. Each event are related to a session, not a user.

## Why Solid Pancake over Google Analytics?

### For the data

We do not known how the data collected is used through the Google's products. Moreover, the data is not stored in european databases, that can cause some legal problems.

Solid Pancake is a self-hosted service that can secure, provide and properly delete usage data.

### For the user

There is NO user-related data in Solid Pancake. Each session is anonymous =)

## Frontend web tracking with Sirup.js

`sirup.js` is a way to use the Solid Pacake API on a frontend interface.

### Quickstart

Add the library to your code:

```
<script src="https://solid-pancake.thefirstspine.fr/sirup.js"></script>
```

Then, register the page:

```
<script>sirup.persistantSession('MY_SERVICE', navigator.platform).then(() => { sirup.event('viewPage', 'navigation', document.location.href); })</script>
```

### API reference

#### bootstrap

Scenario: `bootstrap(config)`

Start the `sirup.js` library

#### persistantSession

Scenario: `async persistantSession(product, label = '', version = '')`

Looks for a session ID corresponding to product / label / version triplet. Store this ID if found, otherwise create the session to Solid Pancake.

#### session

Scenario: `async session(product, label = '', version = '')`

Creates a session in Solid Pancake.

#### event

Register an event in Solid Pancake

Scenario: `event(event, category, action = '', label = '')`

#### call

Call the Solid Pancake API

Scenario: `async call(endpoint, data)`