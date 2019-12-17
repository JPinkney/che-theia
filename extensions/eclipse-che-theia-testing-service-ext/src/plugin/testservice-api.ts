/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
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

import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { Plugin } from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import * as testservice from '@eclipse-che/testing-service';
import { LanguageMainTestInterface } from '../common/test-protocol';
import { PLUGIN_RPC_CONTEXT } from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import * as vst from 'vscode-languageserver-types';

export interface TestApiFactory {
    (plugin: Plugin): typeof testservice;
}

export function createAPIFactory(rpc: RPCProtocol): TestApiFactory {

    return function (plugin: Plugin): typeof testservice {

        const testMain = rpc.getProxy(PLUGIN_RPC_CONTEXT.LANGUAGES_MAIN) as unknown as LanguageMainTestInterface;

        const languageserver: typeof testservice.languageserver = {

            // tslint:disable
            completion(pluginID: string, model: any, position: any, context: any, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
                return testMain.$provideCompletionItems(pluginID, model, position, context, token);
            },
            definition(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition> {
                return testMain.$provideDefinition(pluginID, model, position, token);
            },
            declaration(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition> {
                return testMain.$provideDeclaration(pluginID, model, position, token);
            },
            signatureHelp(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.SignatureHelpContext, token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.SignatureHelpResult>> {
                return testMain.$provideSignatureHelp(pluginID, model, position, token, context);
            },
            implementation(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition> {
                return testMain.$provideImplementation(pluginID, model, position, token);
            },
            typeDefinition(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition> {
                return testMain.$provideTypeDefinition(pluginID, model, position, token);
            },
            hover(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Hover> {
                return testMain.$provideHover(pluginID, model, position, token);
            },
            documentHighlight(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.DocumentHighlight[]> {
                return testMain.$provideDocumentHighlights(pluginID, model, position, token);
            },
            workspaceSymbols(pluginID: string, query: { query: string }, token: monaco.CancellationToken): Thenable<vst.SymbolInformation[]> {
                return testMain.$provideWorkspaceSymbols(pluginID, query, token);
            },
            documentFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, options: monaco.languages.FormattingOptions, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]> {
                return testMain.$provideDocumentFormattingEdits(pluginID, model, options, token);
            },
            documentRangeFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, range: Range, options: monaco.languages.FormattingOptions, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]> {
                return testMain.$provideDocumentRangeFormattingEdits(pluginID, model, range, options, token);
            },
            onTypeFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, ch: string, options: monaco.languages.FormattingOptions, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]> {
                return testMain.$provideOnTypeFormattingEdits(pluginID, model, position, ch, options, token);
            },
            documentLinks(pluginID: string, model: monaco.editor.ITextModel, token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.ILinksList>> {
                return testMain.$provideLinks(pluginID, model, token);
            },
            codeActions(pluginID: string, model: monaco.editor.ITextModel, rangeOrSelection: Range, context: monaco.languages.CodeActionContext, token: monaco.CancellationToken): Promise<monaco.languages.CodeActionList | Promise<monaco.languages.CodeActionList>> {
                return testMain.$provideCodeActions(pluginID, model, rangeOrSelection, context, token);
            },
            codeLenses(pluginID: string, model: monaco.editor.ITextModel, token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.CodeLensList>> {
                return testMain.$provideCodeLenses(pluginID, model, token);
            },
            references(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.ReferenceContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Location[]> {
                return testMain.$provideReferences(pluginID, model, position, context, token);
            },
            symbols(pluginID: string, model: any, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.DocumentSymbol[]> {
                return testMain.$provideDocumentSymbols(pluginID, model, token);
            },
            documentColors(pluginID: string, model: monaco.editor.ITextModel, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.IColorInformation[]> {
                return testMain.$provideDocumentColors(pluginID, model, token);
            },
            foldingRange(pluginID: string, model: monaco.editor.ITextModel, context: monaco.languages.FoldingContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.FoldingRange[]> {
                return testMain.$provideFoldingRanges(pluginID, model, context, token);
            },
            renameEdits(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, newName: string, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.WorkspaceEdit & monaco.languages.Rejection> {
                return testMain.$provideRenameEdits(pluginID, model, position, newName, token);
            }

        };

        return <typeof testservice>{
            languageserver
        };

    };
}
