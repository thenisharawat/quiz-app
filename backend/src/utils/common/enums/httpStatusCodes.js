/* HTTP Status Codes */
exports.HttpStatus = Object.freeze({ // To make these constant used freeze
    // Informational 1xx
    continue: 100,
    switchingProtocols: 101,
    processing: 102,

    // Success 2xx
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204,

    // Redirection 3xx
    multipleChoices: 300,
    movedPermanently: 301,
    found: 302,
    seeOther: 303,
    notModified: 304,

    // Client Errors 4xx
    badRequest: 400,
    unauthorized: 401,
    paymentRequired: 402,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    notAcceptable: 406,
    requestTimeout: 408,
    unProcessableEntity: 422,

    // Server Errors 5xx
    internalServerError: 500,
    notImplemented: 501,
    badGateway: 502,
    serviceUnavailable: 503,
    gatewayTimeout: 504,
});