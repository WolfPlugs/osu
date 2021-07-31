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
        console.log("thisworkjs");
        this.getUserStats(args.join(" "))
          .then((data) => {
            console.log(data.body);
            return {
              send: true,
              result: `**${data.body.username}** has **${data.body.playcount}** plays and **${data.body.total_score}** score.`
            }
          })
          .catch((err) => {
            return {
              send: false,
              result: `Error: ${err}`
            }
          });
      },
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("osu");
  }
  // function to fetch the user stats from osu
  async getUserStats(username) {
    return await get(`https://api.obamabot.ml/text/osu?user=${username}`)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }
};
