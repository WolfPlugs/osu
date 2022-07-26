const { Plugin } = require("powercord/entities");
const { get } = require("powercord/http");

module.exports = class Osu extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "osu",
      description: "Get a user STATs from OSU",
      usage: "{c} [username]",
      executor: async (args) => {
        // get the user stats
        try {
          const { body } = await get(
            `https://api.obamabot.cf/v2/text/osu?user=${args.join(" ")}`
          );
		  console.log(body)
          if (body.length === 0) {
            
            return {
              result: "No user found",
              username: "Pippi",
              avatar_url: "https://i.imgur.com/eRTuzdt.png"
            }
          }
          // string the stats
          const string = [
            `__${body.username}'s Stats__`,
            `Global Rank: **${
              body.custom[0].pp_rank
            }** (:flag_${body.custom[0].country_code}: #${
              body.custom[0].pp_country_rank
            })`,
            `PP: **${body.custom[0].pp_raw}**`,
            `Play Count: **${body.custom[0].playcount}**`,
            `Accuracy: **${body.custom[0].hit_accuracy}%**`,
            `Time Played: **${body.custom[0].time_played}**`,
          ].join("\n");

          // send the user a message with the user stats
          return {
            send: false,
            result: string,
			username: "Pippi",
            avatar_url: "https://i.imgur.com/eRTuzdt.png"
          };
        } catch (e) {
			console.log(e)
          return {
            result: `${e}`,
            username: "Pippi",
            avatar_url: "https://i.imgur.com/eRTuzdt.png",
          };
        }
      },
    });
  }

  pluginWillUnload() {powercord.api.commands.unregisterCommand("osu");}
};