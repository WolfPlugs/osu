const { Plugin } = require("powercord/entities");
const { get } = require("powercord/http");

module.exports = class Osu extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "osu",
      description: "Get a user STATs from OSU",
      usage: "{c} [username]",
      // send the user a message with the user stats
      executor: async (args) => {
        // get the user stats
        try {
        const { body } = await get(`https://api.obamabot.ml/text/osu?user=${args.join(" ")}`);
        if(body.length === 0) {
          return {
            send: true, resutl:"No user found"
          }
        }
        // string the stats
        const string = [
          `__${body.username}'s Stats__\n`,
          `Global Rank: **${body.formated_pp_rank}** (:flag_${body.country.toLowerCase()}: #${body.formated_pp_country_rank})\n`,
          `PP: **${body.pp_raw}**\n`,
          `Play Count: **${body.playcount}**\n`,
          `Accuracy: **${body.short_accuracy}%**\n`,
          `Time Played: **${body.time_played}**`,
      ].join('\n')

        // send the user a message with the user stats
        return {
          send: true,
          result: string,
        }

        } catch (e) {
          return  {
            send: true, result: `Error:  ${e}`
          }
        }        
      },
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("osu");
  }
  
};
