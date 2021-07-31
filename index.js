const { Plugin } = require("powercord/entities");
const { get } = require("powercord/http");

module.exports = class Osu extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "osu",
      description: "Get a user STATs from OSU",
      usage: "{c} [username]",
      // send the user a message with the user stats
      execute: (args, channel) => {
        this.getUserStats(args.join(" "))
          .then((data) => {
            channel.send(
              `**${data.username}** has **${data.playcount}** plays and **${data.total_score}** score.`
            );
          })
          .catch((err) => {
            channel.send(`Error: ${err}`);
          });
      },
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("osu");
  }
  // function to fetch the user stats from osu
  getUserStats(username) {
    return get("https://api.obamabot.ml/text/osu", {
      params: {
        user: username,
      },
    })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }
};
