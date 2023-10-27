// import {Command} from '@oclif/core'

import { BaseCommand } from "../../base";

export default class World extends BaseCommand<typeof World> {
  static args = {}

  static description = 'Say hello world'

  static enableJsonFlag = true;

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {}

  async run(): Promise<{msg: string}> {
    const msg = 'hello world! (./src/commands/hello/world.ts)';
    this.log(msg);
    return {msg};
  }
}
