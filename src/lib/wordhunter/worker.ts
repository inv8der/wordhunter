import Trie from './trie'
import words from './word-list.txt'

function findMatchingWords(trie: Trie, pattern: string, letters: string[]) {
  const letterBank = letters.reduce((map, letter) => {
    if (map.has(letter)) {
      map.set(letter, map.get(letter) + 1)
    } else {
      map.set(letter, 1)
    }
    return map
  }, new Map())

  function _findMatch(
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
          const matches = _findMatch(childNode, pattern, letterBank, index + 1)
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
        const matches = _findMatch(childNode, pattern, letterBank, index + 1)
        result = result.concat(matches.map((word) => char + word))
        letterBank.set(char, remaining)
      }
    }

    return result
  }

  return _findMatch(trie, pattern, letterBank, 0)
}

function solveWord(letters: string[], pattern: string): string[] {
  const wordList = words.split('\n')
  const trie = Trie.buildTrie(wordList)
  return findMatchingWords(trie, pattern, letters)
}

function solvePuzzle(
  letters: string[],
  threeLetterWordsAllowed: boolean
): string[] {
  const wordList = words.split('\n')
  const trie = Trie.buildTrie(wordList)
  let solutions: string[] = []

  for (
    let len = threeLetterWordsAllowed ? 3 : 4;
    len <= letters.length;
    len += 1
  ) {
    const pattern = ''.padStart(len, '*')
    solutions = solutions.concat(findMatchingWords(trie, pattern, letters))
  }

  return solutions
}

self.onmessage = function (e: MessageEvent) {
  const { id, command, args } = e.data

  switch (command) {
    case 'solve-word': {
      const solutions = solveWord(...(args as Parameters<typeof solveWord>))
      self.postMessage({ id, result: solutions })
      break
    }

    case 'solve-puzzle': {
      const solutions = solvePuzzle(...(args as Parameters<typeof solvePuzzle>))
      self.postMessage({ id, result: solutions })
      break
    }
  }
}

export {}
