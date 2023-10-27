import {Command, Flags, Interfaces} from '@oclif/core'

enum LogLevel {
  debug = 'debug',
  error = 'error',
  info = 'info',
  warn = 'warn',
}

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['baseFlags'] & T['flags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  // define flags that can be inherited by any command that extends BaseCommand
  static baseFlags = {
    'log-level': Flags.custom<LogLevel>({
      helpGroup: 'GLOBAL',
      options: Object.values(LogLevel),
      summary: 'Specify level for logging.',
    })(),
  }

  // not enabled in base class, but it doesn't seem to matter
  // static enableJsonFlag = true

  protected args!: Args<T>
  protected flags!: Flags<T>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async catch(err: Error & {exitCode?: number}): Promise<any> {
    // add any custom logic to handle errors from the command
    // or simply return the parent class error handling
    return super.catch(err)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async finally(_: Error | undefined): Promise<any> {
    // called after run and catch regardless of whether or not the command errored
    return super.finally(_)
  }

  public async init(): Promise<void> {
    await super.init()
    const {args, flags} = await this.parse({
      args: this.ctor.args,
      baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
      flags: this.ctor.flags,
      strict: this.ctor.strict,
    })
    this.flags = flags as Flags<T>
    this.args = args as Args<T>
  }
}

// src/commands/my-command.ts

export default class MyCommand extends BaseCommand<typeof MyCommand> {
  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --json',
    '<%= config.bin %> <%= command.id %> --log-level debug',
  ]

  static flags = {
    name: Flags.string({
      char: 'n',
      required: true,
      summary: 'Name to print.',
    }),
  }

  static summary = 'child class that extends BaseCommand'

  public async run(): Promise<Flags<typeof MyCommand>> {
    for (const [flag, value] of Object.entries(this.flags)) {
      this.log(`${flag}: ${value}`)
    }

    return this.flags
  }
}
