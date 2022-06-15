# Obsidian Word Definition Replacer
This is a simple plugin designed to solve a very specific problem that I had.

After installing this plugin you will be able to write `%%def:some word%%` in your notes and have it automatically replaced by the english definition of the word.

For example `%%def:future%%` will be replaced by `The time ahead; those moments yet to be experienced.`

This plugin is most useful when mixed with others. My current usecase is that I'd like to highlight words I don't know in Kindle while reading and have them automatically created as Anki flashcards to be reviewed later on.

Using the [Kindle Plugin](https://github.com/hadynz/obsidian-kindle-plugin) and [Spaced Repitition](https://github.com/st3v3nmw/obsidian-spaced-repetition) plugin I can highligh words in a specific color while reading on Kindle and automatically create flashcards. After install both of above plugins the following has been setup:

### Kindle Plugin
Change the Highlight Template (color can be anything you'd like)

```
{{ text }} — location: [{{ location }}]({{ appLink }})
{% if color == "blue" %}{{text}}::%%def:{{text}}%%{% endif %}

{% if note %}{{note}}{% endif %}

---
```

Change File Template to include #flashcards as a tag


