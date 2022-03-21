# initializeEnvironment: () => void;

# isEmptyEnvVariable: (envVariables: {}) => boolean;

# Logg: (message: string) => ILogg;

interface ILogg {
log: () => void;
file: () => void;
}
