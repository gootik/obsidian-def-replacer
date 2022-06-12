import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, View } from 'obsidian';

const WORD_DEF_KEYWORD = '$$def';
const WORD_DEF_REGEX = /\%\%def\:(.*?)\%\%/g;
const DICTIONARY_ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const PUNCTUATION_REGEX = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

export default class MyPlugin extends Plugin {

    async onload() {
        await this.loadSettings();

        // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
        this.registerInterval(window.setInterval(async () => {
            const files = this.app.vault.getMarkdownFiles();
            files.forEach(async (file) => {
                let data: string = await file.vault.adapter.read(file.path);

                const words_to_replace: string[][]= [...data.matchAll(WORD_DEF_REGEX)];
                if (!words_to_replace || words_to_replace.length == 0) {
                    return;
                }

                for (var i = 0; i < words_to_replace.length; i++) {
                    const word_def: string[] = words_to_replace[i];
                    
                    let word: string = word_def[1];
                    word = word.trim().replace(PUNCTUATION_REGEX, '');

                    const response = await fetch(DICTIONARY_ENDPOINT + '/' + word);
                    if (!response || !response.ok) {
                        return;
                    }
                    
                    const word_json: Record<string, any>[] = await response.json();
                    if (!word_json || !word_json.length || !word_json[0]['meanings'] || !word_json[0]['meanings'].length) {
                        return;
                    }

                    const def: string = word_json[0]['meanings'][0]['definitions'][0]['definition'];
                    data = data.replace(word_def[0], def);
                }

                file.vault.adapter.write(file.path, data);
            });
        }, 5000));
    }

    onunload() {

    }

    async loadSettings() {
        
    }

    async saveSettings() {
        
    }
}

