const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    team: {
        type: String,
    },
    bazaar: {
        maps: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        },
        rounds: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        }
    },
    cargo: {
        maps: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        },
        rounds: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        }
    },
    downfall: {
        maps: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        },
        rounds: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        }
    },
    quarantine: {
        maps: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        },
        rounds: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        }
    },
    suburbia: {
        maps: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        },
        rounds: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        }
    },
    subway: {
        maps: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        },
        rounds: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        }
    },
    tanker: {
        maps: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        },
        rounds: {
            win: {
                type: Number,
                default: 0
            },
            loss: {
                type: Number,
                default: 0
            }
        }
    }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;