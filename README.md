# Mock Backend API
- All routes are assumed to do a `503` response on failure and a `200` with content on success, unless stated in the description.
- All changes to backend data will be reset when the server is killed.

- Before starting the server : `npm install`
- To start the server: `node ./mock-backend.js`, by default the server will be listening to the port 3000.

- You can optionally simulate random request failures by changing `REQUEST_SUCCESS_RATE` in `mock-backend.js`.

- The audience and bandwidth data are ending at the timestamp of when you launched the server and are beginning 15 days before. You can see the timestamps associated in the logs. This is done by the "process data" section in `mock-backend.js` so you can remove it if you want to use fixed timestamps (from November 1st of 2017 to November 16th of 2017).

## User profiles and authentication
- `/auth` - User authentication
  - `POST` request:
    - `identifiant` - User identifiant: `urtoob`, `swagtv` or `shinynewclient`.
    - `password` - Consult `data/clients.json` for each client's password, we use plaintext for simplicity sake.
  - `JSON` response:
    - `session_token` - Session token for authentication.
- `/logout` - Log out current user.
  - `POST` request:
    - `session_token` - Session token to de-authenticate.
  - Empty response.
- `/myinfo` - User information.
  - `POST` request:
    - `session_token` - Session token for authentication.
  - `JSON` response:
    - `company` - Company name.
    - `fname` - First name of registerer.
    - `lname` - Last name of registerer.
    - `email` - Email of registerer.
    - `website` - Company website.
    - `timestamp` - Account creation time in UNIX timestamp.
    - `description` - Short description of the company.
    - `apitoken` - API token to pass to our JS library (not used in the frontend but user need this to use our product)
- `/updatepwd` - Update user password.
  - `POST` request:
    - `session_token` - Session token from authentication.
    - `old_password` - Old password for more authentication.
    - `new_password` - New password to replace.
  - Empty response.
- `/updateinfo` - Update user information.
  - `POST` request:
    - Only include field(s) to be changed in your request!
    - `session_token` - Session token from authentication.
    - `company` - Company name.
    - `fname` - First name of registerer.
    - `lname` - Last name of registerer.
    - `email` - Email of registerer.
    - `website` - Company website.
    - `description` - Short description of the company.
  - Empty response.

## User notification
- `/notifications` - Get ongoing notifications for this user
  - `POST` request:
    - `session_token` - Session token from authentication.
  - `JSON` response: Array of notifications' information.
    - `type` - `note`, `error` or `warning` - Notification type.
    - `message` - Notification message.

## Data routes
- `/bandwidth` - Extract P2P and CDN bandwidth consumed by time. (in `Bits per second`)
  - `POST` request:
    - `session_token` - Session token from authentication.
    - `from` - Unix timestamp from which to extract data.
    - `to` - Unix timestamp to which to extract data.
    - `aggregate` - optional - `sum`, `average`, `max` or `min` - Instead of returning data, return an aggregated value. Or an error if there is not data in this time scope.
  - `JSON` response:
    - No `aggregate`:
      - `timestamp` - Array containing timestamps.
      - `cdn` - Array containing amount of consumed CDN bandwidth at corresponding timestamps.
      - `p2p` - Array containing amount of consumed P2P bandwidth at corresponding timestamps.
    - With `aggregate`:
      - `cdn` - Aggregated CDN traffic bandwidth in time range.
      - `p2p` - Aggregated P2P traffic bandwidth in time range.
- `/audience` - Extract number or concurrent viewers by time. (in `number of viewers`)
  - `POST` request:
    - `session_token` - Session token from authentication.
    - `from` - Unix timestamp from which to extract data.
    - `to` - Unix timestamp to which to extract data.
    - `aggregate` - optional - `sum`, `average`, `max` or `min` - Instead of returning data, return an aggregated value. Or an error if there is not data in this time scope.
  - `JSON` response:
    - No `aggregate`:
      - `timestamp` - Array containing timestamps.
      - `viewers` - Array containing number of concurrent viewers at corresponding timestamps.
    - With `aggregate`:
      - `viewers` - Aggregated number of concurrent viewers in time range.
- `/streams` - Aggregated stats by media stream.
  - `POST` request with `session_token`.
  - `JSON` response: Array of JSON objects with keys.
    - `cdn` - Amount of consumed CDN traffic in `Bytes`.
    - `p2p` - Amount of consumed P2P traffic in `Bytes`.
    - `manifest` - Content ID of the stream.
    - `max_viewers` - Max number of viewers on this stream.
    - `average_viewers` - Average number of viewers on this stream.
- `/countries` - Aggregated stats by countries.
  - `POST` request with `session_token`.
  - `JSON` response: Array of JSON objects with keys.
    - `cdn` - Amount of consumed CDN traffic in `Bytes`.
    - `p2p` - Amount of consumed P2P traffic in `Bytes`.
    - `country` - 2 character country code.
- `/isps` - Aggregated stats by ISPs.
  - `POST` request with `session_token`.
  - `JSON` response: Array of JSON objects with keys.
    - `cdn` - Amount of consumed CDN traffic in `Bytes`.
    - `p2p` - Amount of consumed P2P traffic in `Bytes`.
    - `isp` - ISP name.
- `/platforms` - Aggregated stats by viewer platform.
  - `POST` request with `session_token`.
  - `JSON` response: Array of JSON objects with keys.
    - `platform` -  name of the platform.
    - `cdn` - Amount of consumed CDN traffic in `Bytes`.
    - `p2p` - Amount of consumed P2P traffic in `Bytes`.
    - `upload` - Amount of P2P upload in `Bytes`.
    - `max_viewers` - Max number of viewers on this platform.
    - `average_viewers` - Average number of viewers on this platform.