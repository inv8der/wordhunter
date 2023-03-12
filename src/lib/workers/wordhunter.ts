import words from './word-list.txt'

class Trie {
  private terminal = false
  private children: Map<string, Trie> = new Map()

  public isTerminal() {
    return this.terminal
  }

  public getChild(char: string) {
    return this.children.get(char)
  }

  public getLinks() {
    const links = []
    for (const entry of this.children.entries()) {
      links.push(entry)
    }
    return links
  }

  public static buildTrie(words: string[]): Trie {
    const root = new Trie()
    let node = root

    for (const word of words) {
      for (const char of word) {
        let child = node.children.get(char)
        if (!child) {
          child = new Trie()
          node.children.set(char, child)
        }
        node = child
      }
      node.terminal = true
      node = root
    }

    return root
  }
}

class Wordhunter {
  private wordList: Trie

  constructor(wordList: string[]) {
    this.wordList = Trie.buildTrie(wordList)
  }

  public solve(pattern: string, letters: string[]) {
    const letterBank = letters.reduce((map, letter) => {
      if (map.has(letter)) {
        map.set(letter, map.get(letter) + 1)
      } else {
        map.set(letter, 1)
      }
      return map
    }, new Map())

    return this._findMatch(this.wordList, pattern, letterBank, 0)
  }

  private _findMatch(
    currentNode: Trie,
    pattern: string,
    letterBank: Map<string, number>,
    index: number
  ) {
    if (index === pattern.length) {
      return currentNode.isTerminal() ? [''] : []
    }

    let result: string[] = []

    if (pattern.charAt(index) === '*') {
      const links = currentNode.getLinks()
      for (const [char, childNode] of links) {
        const remaining = letterBank.get(char) ?? 0
        if (remaining > 0) {
          letterBank.set(char, remaining - 1)
          const matches = this._findMatch(
            childNode,
            pattern,
            letterBank,
            index + 1
          )
          result = result.concat(matches.map((word) => char + word))
          letterBank.set(char, remaining)
        }
      }
    } else {
      const char = pattern.charAt(index)
      const childNode = currentNode.getChild(char)
      const remaining = letterBank.get(char) ?? 0

      if (childNode && remaining > 0) {
        letterBank.set(char, remaining - 1)
        const matches = this._findMatch(
          childNode,
          pattern,
          letterBank,
          index + 1
        )
        result = result.concat(matches.map((word) => char + word))
        letterBank.set(char, remaining)
      }
    }

    return result
  }
}

function solveWord(letters: string[], pattern: string): string[] {
  const wordList = words.split('\n')
  const wordscaper = new Wordhunter(wordList)

  return wordscaper.solve(pattern, letters)
}

function solvePuzzle(
  letters: string[],
  threeLetterWordsAllowed: boolean
): string[] {
  const wordList = words.split('\n')
  const wordscaper = new Wordhunter(wordList)
  let solutions: string[] = []

  for (
    let len = threeLetterWordsAllowed ? 3 : 4;
    len <= letters.length;
    len += 1
  ) {
    const pattern = ''.padStart(len, '*')
    solutions = solutions.concat(wordscaper.solve(pattern, letters))
  }

  return solutions
}

self.onmessage = function (e: MessageEvent) {
  const { command, args } = e.data

  switch (command) {
    case 'solve-word': {
      const solutions = solveWord(...(args as Parameters<typeof solveWord>))
      self.postMessage(solutions)
      break
    }

    case 'solve-puzzle': {
      const solutions = solvePuzzle(...(args as Parameters<typeof solvePuzzle>))
      self.postMessage(solutions)
      break
    }
  }
}

export {}
