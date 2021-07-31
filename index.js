const { Plugin } = require("powercord/entities");
const { getModule, channels } = require("powercord/webpack")
const { createBotMessage } = getModule([ "createBotMessage" ], false)
const { receiveMessage }   = getModule([ "receiveMessage" ], false)
const { get } = require("powercord/http");

module.exports = class Osu extends Plugin {

  async sendBotMessage(content) {
    const received = createBotMessage(channels.getChannelId(), content)
    received.author.username = "Error Daddy"
    return receiveMessage(received.channel_id, received)
}

  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "osu",
      description: "Get a user STATs from OSU",
      usage: "{c} [username]",
      executor: async (args) => {
        // get the user stats
        try {
          const { body } = await get(
            `https://api.obamabot.ml/text/osu?user=${args.join(" ")}`
          );
          if (body.length === 0) {
            this.sendBotMessage("No user found");
            return
          }
          // string the stats
          const string = [
            `__${body.username}'s Stats__`,
            `Global Rank: **${
              body.formated_pp_rank
            }** (:flag_${body.country.toLowerCase()}: #${
              body.formated_pp_country_rank
            })`,
            `PP: **${body.pp_raw}**`,
            `Play Count: **${body.playcount}**`,
            `Accuracy: **${body.short_accuracy}%**`,
            `Time Played: **${body.time_played}**`,
          ].join("\n");

          // send the user a message with the user stats
          return {
            send: true,
            result: string,
          };
        } catch (e) {
          this.sendBotMessage(e.message);
          return
        }
      },
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("osu");
  }
};
