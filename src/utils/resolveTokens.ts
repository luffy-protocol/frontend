import { Option } from "./interface";

export default function resolveTokens(elements: any, chain: number): Option[] {
  if (chain == 1) {
    const tokens = elements.tokens;
    tokens[0].image = elements.chains[0].image;
    return tokens;
  } else {
    const tokens = elements.tokens;
    tokens[0].image = elements.chains[1].image;
    return tokens;
  }
}
