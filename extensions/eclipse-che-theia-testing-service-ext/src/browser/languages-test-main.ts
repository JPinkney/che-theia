/********************************************************************************
 * Copyright (C) 2020 RedHat and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { injectable, inject } from 'inversify';
import { PluginInfo } from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import { SerializedDocumentFilter } from '@theia/plugin-ext/lib/common/plugin-api-rpc-model';
import { LanguagesMainImpl } from '@theia/plugin-ext/lib/main/browser/languages-main';
import * as theia from '@theia/plugin';
import { PluginHandleRegistry } from './plugin-handle-registry';
import { WorkspaceSymbolParams } from '@theia/plugin-ext/lib/common/plugin-api-rpc-model';
import { LanguageMainTestInterface } from '../common/test-protocol';

export type LanguageServerAction = string;
export const LanguageServerActions = {
    'completion': 'completion',
    'definition': 'definition',
    'declaration': 'declaration',
    'signatureHelp': 'signatureHelp',
    'implementation': 'implementation',
    'typeDefinition': 'typeDefinition',
    'hover': 'hover',
    'documentHighlight': 'documentHighlight',
    'workspaceSymbols': 'workspaceSymbols',
    'documentFormattingEdits': 'documentFormattingEdits',
    'documentRangeFormattingEdits': 'documentRangeFormattingEdits',
    'onTypeFormattingEdits': 'onTypeFormattingEdits',
    'documentLinks': 'documentLinks',
    'codeActions': 'codeActions',
    'codeLenses': 'codeLenses',
    'references': 'references',
    'symbols': 'symbols',
    'documentColors': 'documentColors',
    'foldingRange': 'foldingRange',
    'renameEdits': 'renameEdits'
};

export interface LanguagesMainHandle {
    handle: number;
    languagesMain: LanguagesMainTest;
}

@injectable()
export class LanguagesMainTest extends LanguagesMainImpl implements LanguageMainTestInterface {

    @inject(PluginHandleRegistry)
    private readonly pluginHandleRegistry: PluginHandleRegistry;

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    private tryToFindRegisteredAction(pluginID: string, languageServerAction: string) {
        const languageFeatureRegistrant = this.pluginHandleRegistry.pluginRegistrationMap.get(pluginID);
        if (languageFeatureRegistrant) {
            const correctLanguagesMain = languageFeatureRegistrant.languagesMainImpl;
            const correctLanguageServerHandle = languageFeatureRegistrant.action.get(languageServerAction);
            if (correctLanguageServerHandle) {
                return {
                    handle: correctLanguageServerHandle,
                    languagesMain: correctLanguagesMain
                };
            }
        }
        return undefined;
    }

    private async lookupLanguagesMainForPluginAndAction(pluginID: string, languageServerAction: string): Promise<LanguagesMainHandle | undefined> {
        /**
         * Sometimes a language feature hasn't been registered before a language call is made. That is OK. We can block while waiting for the language server
         * to register the feature with languages-main. The tests will timeout if it hasn't registered in 60 seconds after the test made the original call.
         */
        const amount = 60;
        for (let i = 0; i < amount; i++) {

            const isRegistered = this.tryToFindRegisteredAction(pluginID, languageServerAction);
            if (!isRegistered) {
                await this.sleep(1000);
            } else {
                return isRegistered;
            }
        }

        return undefined;
    }

    $provideCompletionItems(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        context: monaco.languages.CompletionContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.CompletionList> {

        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.completion).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideCompletionItems(potentialLanguagesMain.handle, model, position, context, token);
            }
            return undefined;
        });
    }

    $provideDefinition(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.definition).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideDefinition(potentialLanguagesMain.handle, model, position, token);
            }
            return undefined;
        });
    }

    $provideDeclaration(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.declaration).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideDeclaration(potentialLanguagesMain.handle, model, position, token);
            }
        });
    }

    $provideSignatureHelp(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken, context: monaco.languages.SignatureHelpContext): Promise<monaco.languages.ProviderResult<monaco.languages.SignatureHelpResult>> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.signatureHelp).then(potentialLanguageMain => {
            if (potentialLanguageMain) {
                return potentialLanguageMain.languagesMain.provideSignatureHelp(potentialLanguageMain.handle, model, position, token, context);
            }
            return Promise.resolve(undefined);
        });
    }

    $provideImplementation(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.implementation).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideImplementation(potentialLanguagesMain.handle, model, position, token);
            }
        });
    }

    $provideTypeDefinition(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.typeDefinition).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideTypeDefinition(potentialLanguagesMain.handle, model, position, token);
            }
        });
    }

    $provideHover(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Hover> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.hover).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideHover(potentialLanguagesMain.handle, model, position, token);
            }
        });
    }

    $provideDocumentHighlights(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.DocumentHighlight[]> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.documentHighlight).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideDocumentHighlights(potentialLanguagesMain.handle, model, position, token);
            }
        });
    }

    $provideWorkspaceSymbols(pluginID: string, params: WorkspaceSymbolParams,
        token: monaco.CancellationToken): Thenable<import('vscode-languageserver-types').SymbolInformation[]> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.workspaceSymbols).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideWorkspaceSymbols(potentialLanguagesMain.handle, params, token);
            }
            return [];
        });
    }

    $provideDocumentFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, options: monaco.languages.FormattingOptions,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.documentFormattingEdits).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideDocumentFormattingEdits(potentialLanguagesMain.handle, model, options, token);
            }
        });
    }

    // tslint:disable-next-line:no-any
    $provideDocumentRangeFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, range: any, options: monaco.languages.FormattingOptions,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.documentRangeFormattingEdits).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideDocumentRangeFormattingEdits(potentialLanguagesMain.handle, model, range, options, token);
            }
        });
    }

    $provideOnTypeFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, ch: string, options: monaco.languages.FormattingOptions,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.onTypeFormattingEdits).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideOnTypeFormattingEdits(potentialLanguagesMain.handle, model, position, ch, options, token);
            }
        });
    }

    $provideLinks(pluginID: string, model: monaco.editor.ITextModel, token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.ILinksList>> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.documentLinks).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideLinks(potentialLanguagesMain.handle, model, token);
            }
            return Promise.resolve(undefined);
        });
    }

    // tslint:disable-next-line:no-any
    $provideCodeActions(pluginID: string, model: monaco.editor.ITextModel, rangeOrSelection: any, context: monaco.languages.CodeActionContext,
        token: monaco.CancellationToken): Promise<monaco.languages.CodeActionList | Promise<monaco.languages.CodeActionList>> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.codeActions).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideCodeActions(potentialLanguagesMain.handle, model, rangeOrSelection, context, token);
            }
            return {
                actions: [],
                dispose: () => { }
            };
        });
    }

    $provideCodeLenses(pluginID: string, model: monaco.editor.ITextModel,
        token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.CodeLensList>> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.codeLenses).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideCodeLenses(potentialLanguagesMain.handle, model, token);
            }
            return undefined;
        });
    }

    $provideReferences(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.ReferenceContext,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Location[]> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.references).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideReferences(potentialLanguagesMain.handle, model, position, context, token);
            }
            return undefined;
        });
    }

    $provideDocumentColors(pluginID: string, model: monaco.editor.ITextModel,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.IColorInformation[]> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.documentColors).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideDocumentColors(potentialLanguagesMain.handle, model, token);
            }
            return undefined;
        });
    }

    $provideFoldingRanges(pluginID: string, model: monaco.editor.ITextModel, context: monaco.languages.FoldingContext,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.FoldingRange[]> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.foldingRange).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideFoldingRanges(potentialLanguagesMain.handle, model, context, token);
            }
            return undefined;
        });
    }

    $provideRenameEdits(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, newName: string,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.WorkspaceEdit & monaco.languages.Rejection> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.renameEdits).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideRenameEdits(potentialLanguagesMain.handle, model, position, newName, token);
            }
            return undefined;
        });
    }

    $provideDocumentSymbols(pluginID: string, model: monaco.editor.ITextModel,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.DocumentSymbol[]> {
        return this.lookupLanguagesMainForPluginAndAction(pluginID, LanguageServerActions.symbols).then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.provideDocumentSymbols(potentialLanguagesMain.handle, model, token);
            }
            return undefined;
        });
    }

    // tslint:disable
    $registerCompletionSupport(handle: number, pluginInfo: PluginInfo,
        selector: SerializedDocumentFilter[], triggerCharacters: string[], supportsResolveDetails: boolean): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.completion);
        super.$registerCompletionSupport(handle, pluginInfo, selector, triggerCharacters, supportsResolveDetails);
    }

    $registerDefinitionProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.definition);
        super.$registerDefinitionProvider(handle, pluginInfo, selector);
    }

    $registerDeclarationProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.declaration);
        super.$registerDeclarationProvider(handle, pluginInfo, selector);
    }

    $registerReferenceProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.references);
        super.$registerReferenceProvider(handle, pluginInfo, selector);
    }

    $registerSignatureHelpProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[], metadata: theia.SignatureHelpProviderMetadata): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.signatureHelp);
        super.$registerSignatureHelpProvider(handle, pluginInfo, selector, metadata);
    }

    $registerImplementationProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.implementation);
        super.$registerImplementationProvider(handle, pluginInfo, selector);
    }

    $registerTypeDefinitionProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.typeDefinition);
        super.$registerTypeDefinitionProvider(handle, pluginInfo, selector);
    }

    $registerHoverProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.hover);
        super.$registerHoverProvider(handle, pluginInfo, selector);
    }

    $registerDocumentHighlightProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.documentHighlight);
        super.$registerDocumentHighlightProvider(handle, pluginInfo, selector);
    }

    $registerWorkspaceSymbolProvider(handle: number, pluginInfo: PluginInfo): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.workspaceSymbols);
        super.$registerWorkspaceSymbolProvider(handle, pluginInfo);
    }

    $registerDocumentLinkProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.documentLinks);
        super.$registerDocumentLinkProvider(handle, pluginInfo, selector);
    }

    $registerCodeLensSupport(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[], eventHandle: number): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.codeLenses);
        super.$registerCodeLensSupport(handle, pluginInfo, selector, eventHandle);
    }

    $registerOutlineSupport(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.symbols);
        super.$registerOutlineSupport(handle, pluginInfo, selector);
    }

    $registerDocumentFormattingSupport(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.documentFormattingEdits);
        super.$registerDocumentFormattingSupport(handle, pluginInfo, selector);
    }

    $registerRangeFormattingProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.documentRangeFormattingEdits);
        super.$registerRangeFormattingProvider(handle, pluginInfo, selector);
    }

    $registerOnTypeFormattingProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[], autoFormatTriggerCharacters: string[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.onTypeFormattingEdits);
        super.$registerOnTypeFormattingProvider(handle, pluginInfo, selector, autoFormatTriggerCharacters);
    }

    $registerFoldingRangeProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.foldingRange);
        super.$registerFoldingRangeProvider(handle, pluginInfo, selector);
    }

    $registerDocumentColorProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.documentColors);
        super.$registerDocumentColorProvider(handle, pluginInfo, selector);
    }

    $registerRenameProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[], supportsResolveLocation: boolean): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, LanguageServerActions.renameEdits);
        super.$registerRenameProvider(handle, pluginInfo, selector, supportsResolveLocation);
    }

    private registerPluginWithFeatureHandle(handle: number, extensionID: string, newlyRegisteredAction: string): void {
        if (this.pluginHandleRegistry.pluginRegistrationMap.has(extensionID)) {
            (this.pluginHandleRegistry.pluginRegistrationMap.get(extensionID) as any).action.set(newlyRegisteredAction, handle);
        } else {
            this.pluginHandleRegistry.pluginRegistrationMap.set(extensionID,
                {
                    action: new Map().set(newlyRegisteredAction, handle),
                    languagesMainImpl: this
                });
        }
    }

}
