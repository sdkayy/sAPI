export default `
  type License {
    id: String!
    #
    user: String
    time: Int!
  }

  type ServerSettings {
    id: String
    isFreeMode: Boolean
    isOffline: Boolean
  }

  type FailedConsole {
    id: String
    cpuKey: String
    kvData: String
    ip: String
    num: Int
  }

  type User {
    id: String!
    username: String!
    xbname: String!
    salt: String
    ip: String
    titleid: String
    email: String!
    password: String!
    expires: String
    # This value will be in hours, so if a user has 1 day, it'd be 24hrs.
    reserveDays: Float
    color: Int
    welcomeMessage: String
    tokens: [License]
    cpuKey: String!
    discordId: String
    kvData: String
    isEnabled: Boolean
    isBanned: Boolean
    isAdmin: Boolean
  }

  input UserInputLogin {
    username: String!
    password: String!
  }

  input StealthLogin {
    cpuKey: String!
  }

  input LicenseInput {
    time: Int!
  }

  input UserInput {
    username: String
    xbname: String
    password: String
    email: String
    cpuKey: String
    salt: String
    expires: String
    isEnabled: Boolean
    ip: String
    reserveDays: Int
    color: Int
    kvData: String
  }

  input UpdateUserInput {
    id: String
    qCPU: Boolean
    username: String
    password: String
    email: String
    expires: String
    days: String
    color: Int
    welcomeMessage: String
    cpuKey: String
    isBanned: Boolean
    isAdmin: Boolean
  }

  input UserQueryInput {
    id: String
    username: String
    salt: String
    email: String
    cpuKey: String
    discordId: String
    token: String
  }

  input LicenseQueryInput {
    id: String
  }

  input RedeemLicenseInput {
    cpuKey: String
    license: String
    user: String
  }

  input UpdateServerSettingsInput {
    isFreeMode: Boolean
    isOffline: Boolean
  }

  input FailedConsoleInput {
    cpuKey: String
    kvData: String
    ip: String
    num: Int
  }

  type UserMini {
    id: String
    username: String
    email: String
    color: Int
    xbname: String
    reserveDays: Float
    cpuKey: String
    expires: String
    isAdmin: Boolean
    isBanned: Boolean
    isEnabled: Boolean
  }

  type UserResponse {
    user: UserMini
    token: String
  }

  type Query {
    serverSettings: ServerSettings
    allUsers: [User]
    userCount: Int
    me: User
    user(input: UserQueryInput): User
    license(input: LicenseQueryInput): License
    licenses(input: LicenseQueryInput): [License]
  }

  type Mutation {
    insertFailedConsole(input: FailedConsoleInput): FailedConsole
    updateServerSettings(input: UpdateServerSettingsInput): ServerSettings
    redeemLicense(input: RedeemLicenseInput): Boolean!
    createLicense(input: LicenseInput): License
    updateUser(input: UpdateUserInput): User
    deleteUser(id: String): Int
    register(input: UserInput): Boolean
    login(input: UserInputLogin): UserResponse
  }
`;
