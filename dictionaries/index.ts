import en from './en.json'
import pl from './pl.json'

const dictionaries = {
  en,
  pl
}

export const getDictionary = (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries] || dictionaries.pl
}