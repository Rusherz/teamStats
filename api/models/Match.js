const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  date: {
    type: Date
  },
  homeTeam: {
    type: String
  },
  awayTeam: {
    type: String
  },
  encrValue: {
    type: String
  },
  map1: {
    mapName: {
      type: String
    },
    scoreHome: {
      type: String
    },
    scoreAway: {
      type: String
    },
    homeTeam: {
      marsocWins: {
        type: String
      },
      volkWins: {
        type: String
      }
    },
    awayTeam: {
      marsocWins: {
        type: String
      },
      volkWins: {
        type: String
      }
    }
  },
  map2: {
    mapName: {
      type: String
    },
    scoreHome: {
      type: String
    },
    scoreAway: {
      type: String
    },
    homeTeam: {
      marsocWins: {
        type: String
      },
      volkWins: {
        type: String
      }
    },
    awayTeam: {
      marsocWins: {
        type: String
      },
      volkWins: {
        type: String
      }
    }
  },
  map3: {
    mapName: {
      type: String
    },
    scoreHome: {
      type: String
    },
    scoreAway: {
      type: String
    },
    homeTeam: {
      marsocWins: {
        type: String
      },
      volkWins: {
        type: String
      }
    },
    awayTeam: {
      marsocWins: {
        type: String
      },
      volkWins: {
        type: String
      }
    }
  }
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
