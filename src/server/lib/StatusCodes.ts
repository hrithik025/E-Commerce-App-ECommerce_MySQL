export const enum StatusCodes {
    // Success
    SUCCESS = 200,                    // OK
    CREATED = 201,                    // Created
    ACCEPTED = 202,                   // Accepted
    NO_CONTENT = 204,                 // No Content

    // Client Errors (4xx)
    BAD_REQUEST = 400,                // Bad Request
    UNAUTHORIZED = 401,               // Unauthorized
    FORBIDDEN = 403,                  // Forbidden
    NOT_FOUND = 404,                  // Not Found
    METHOD_NOT_ALLOWED = 405,         // Method Not Allowed
    NOT_ACCEPTABLE = 406,             // Not Acceptable
    CONFLICT = 409,                   // Conflict
    GONE = 410,                       // Gone
    LENGTH_REQUIRED = 411,            // Length Required
    PRECONDITION_FAILED = 412,        // Precondition Failed
    PAYLOAD_TOO_LARGE = 413,          // Payload Too Large
    URI_TOO_LONG = 414,               // URI Too Long
    UNSUPPORTED_MEDIA_TYPE = 415,     // Unsupported Media Type
    RANGE_NOT_SATISFIABLE = 416,      // Range Not Satisfiable
    EXPECTATION_FAILED = 417,         // Expectation Failed
    I_AM_A_TEAPOT = 418,              // I'm a teapot (April Fools joke from RFC 2324)
    UNPROCESSABLE_ENTITY = 422,       // Unprocessable Entity
    LOCKED = 423,                     // Locked
    FAILED_DEPENDENCY = 424,          // Failed Dependency
    TOO_EARLY = 425,                  // Too Early
    UPGRADE_REQUIRED = 426,           // Upgrade Required
    PRECONDITION_REQUIRED = 428,      // Precondition Required
    TOO_MANY_REQUESTS = 429,          // Too Many Requests
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,  // Request Header Fields Too Large
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,    // Unavailable For Legal Reasons

    // Server Errors (5xx)
    SERVER_ERROR = 500,               // Internal Server Error
    NOT_IMPLEMENTED = 501,            // Not Implemented
    BAD_GATEWAY = 502,                // Bad Gateway
    SERVICE_UNAVAILABLE = 503,        // Service Unavailable
    GATEWAY_TIMEOUT = 504,            // Gateway Timeout
    HTTP_VERSION_NOT_SUPPORTED = 505, // HTTP Version Not Supported
    VARIANT_ALSO_NEGOTIATES = 506,    // Variant Also Negotiates
    INSUFFICIENT_STORAGE = 507,       // Insufficient Storage
    LOOP_DETECTED = 508,              // Loop Detected
    NOT_EXTENDED = 510,               // Not Extended
    NETWORK_AUTHENTICATION_REQUIRED = 511,  // Network Authentication Required
};
