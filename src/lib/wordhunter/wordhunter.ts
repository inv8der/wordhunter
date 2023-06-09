import { v4 as uuidv4 } from 'uuid'

type MessageCallback<T = any> = (data: T) => void

type SolveWordCommand = {
  command: 'solve-word'
  args: [string[], string]
}

type SolvePuzzleCommand = {
  command: 'solve-puzzle'
  args: [string[], boolean]
}

export default class Wordhunter {
  private worker?: Worker
  private registeredCallbacks: Map<string, MessageCallback> = new Map()

  constructor() {
    if (global.Worker) {
      this.worker = new Worker(new URL('./worker', import.meta.url))
      this.worker.onmessage = (e: MessageEvent) => {
        const { id: messageId, result } = e.data
        const callback = this.registeredCallbacks.get(messageId)
        if (callback) {
          callback(result)
        }
        this.registeredCallbacks.delete(messageId)
      }
    }
  }

  private postMessage(
    message: SolvePuzzleCommand | SolveWordCommand,
    callback: (result: any) => void
  ) {
    const messageId = uuidv4()
    this.registeredCallbacks.set(messageId, callback)
    this.worker?.postMessage({ id: messageId, ...message })
  }

  public async solveWord(
    letters: string[],
    pattern: string
  ): Promise<string[]> {
    const message: SolveWordCommand = {
      command: 'solve-word',
      args: [letters, pattern],
    }

    return new Promise((resolve) => {
      this.postMessage(message, (result) => {
        resolve(result)
      })
    })
  }

  public async solvePuzzle(
    letters: string[],
    threeLetterWordsAllowed: boolean
  ): Promise<string[]> {
    const message: SolvePuzzleCommand = {
      command: 'solve-puzzle',
      args: [letters, threeLetterWordsAllowed],
    }

    return new Promise((resolve) => {
      this.postMessage(message, (result) => {
        resolve(result)
      })
    })
  }
}
