export default class Trie {
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
