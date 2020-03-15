/*********************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import * as theia from '@theia/plugin';
import { Plugin, RawColorInfo, WorkspaceEditDto } from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import * as testservice from '@eclipse-che/testing-service';
import { PLUGIN_RPC_CONTEXT, TestAPI } from '../common/test-protocol';
import {
    Position,
    Selection
} from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import {
    SymbolInformation
} from 'vscode-languageserver-types';
import {
    CodeLensSymbol, CompletionResultDto, DocumentSymbol, FoldingRange, Location, Range, CodeActionContext, CodeAction, DocumentLink, TextEdit, DocumentHighlight, Definition,
    DefinitionLink, SignatureHelp, Hover
} from '@theia/plugin-ext/lib/common/plugin-api-rpc-model';

export interface TestApiFactory {
    (plugin: Plugin): typeof testservice;
}

export function createAPIFactory(rpc: RPCProtocol): TestApiFactory {

    return function (plugin: Plugin): typeof testservice {

        const testAPI = rpc.getProxy(PLUGIN_RPC_CONTEXT.TEST_API_MAIN) as TestAPI;

        const languageserver: typeof testservice.languageserver = {

            completion(pluginID: string, document: theia.TextDocument,
                position: Position,
                token: theia.CancellationToken,
                context: theia.CompletionContext): Promise<CompletionResultDto | undefined> {
                return testAPI.$provideCompletionItems(pluginID, document, position, context, token);
            },
            implementation(pluginID: string, document: theia.TextDocument, position: Position,
                token: theia.CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
                return testAPI.$provideImplementation(pluginID, document, position, token);
            },
            typeDefinition(pluginID: string, document: theia.TextDocument, position: Position,
                token: theia.CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
                return testAPI.$provideTypeDefinition(pluginID, document, position, token);
            },
            definition(pluginID: string, document: theia.TextDocument, position: Position,
                token: theia.CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
                return testAPI.$provideDefinition(pluginID, document, position, token);
            },
            declaration(pluginID: string, document: theia.TextDocument, position: Position,
                token: theia.CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
                return testAPI.$provideDeclaration(pluginID, document, position, token);
            },
            references(pluginID: string, document: theia.TextDocument, position: Position,
                context: theia.ReferenceContext, token: theia.CancellationToken): Promise<Location[] | undefined> {
                return testAPI.$provideReferences(pluginID, document, position, context, token);
            },
            signatureHelp(
                pluginID: string, document: theia.TextDocument, position: Position, context: theia.SignatureHelpContext, token: theia.CancellationToken
            ): Promise<SignatureHelp | undefined> {
                return testAPI.$provideSignatureHelp(pluginID, document, position, context, token);
            },
            hover(pluginID: string, document: theia.TextDocument, position: Position, token: theia.CancellationToken): Promise<Hover | undefined> {
                return testAPI.$provideHover(pluginID, document, position, token);
            },
            documentHighlights(pluginID: string, document: theia.TextDocument, position: Position,
                token: theia.CancellationToken): Promise<DocumentHighlight[] | undefined> {
                return testAPI.$provideDocumentHighlights(pluginID, document, position, token);
            },
            documentFormattingEdits(pluginID: string, document: theia.TextDocument,
                options: theia.FormattingOptions, token: theia.CancellationToken): Promise<TextEdit[] | undefined> {
                return testAPI.$provideDocumentFormattingEdits(pluginID, document, options, token);
            },
            documentRangeFormattingEdits(pluginID: string, document: theia.TextDocument, range: Range,
                options: theia.FormattingOptions, token: theia.CancellationToken): Promise<TextEdit[] | undefined> {
                return testAPI.$provideDocumentRangeFormattingEdits(pluginID, document, range, options, token);
            },
            onTypeFormattingEdits(
                pluginID: string,
                document: theia.TextDocument,
                position: Position,
                ch: string,
                options: theia.FormattingOptions,
                token: theia.CancellationToken
            ): Promise<TextEdit[] | undefined> {
                return testAPI.$provideOnTypeFormattingEdits(pluginID, document, position, ch, options, token);
            },
            documentLinks(pluginID: string, document: theia.TextDocument, token: theia.CancellationToken): Promise<DocumentLink[] | undefined> {
                return testAPI.$provideDocumentLinks(pluginID, document, token);
            },
            codeLenses(pluginID: string, document: theia.TextDocument, token: theia.CancellationToken): Promise<CodeLensSymbol[] | undefined> {
                return testAPI.$provideCodeLenses(pluginID, document, token);
            },
            codeActions(
                pluginID: string,
                document: theia.TextDocument,
                rangeOrSelection: Range | Selection,
                context: CodeActionContext,
                token: theia.CancellationToken
            ): Promise<CodeAction[] | undefined> {
                return testAPI.$provideCodeActions(pluginID, document, rangeOrSelection, context, token);
            },
            documentSymbols(pluginID: string, document: theia.TextDocument, token: theia.CancellationToken): Promise<DocumentSymbol[] | undefined> {
                return testAPI.$provideDocumentSymbols(pluginID, document, token);
            },
            workspaceSymbols(pluginID: string, query: string, token: theia.CancellationToken): PromiseLike<SymbolInformation[]> {
                return testAPI.$provideWorkspaceSymbols(pluginID, query, token);
            },
            foldingRange(
                pluginID: string,
                document: theia.TextDocument,
                context: theia.FoldingContext,
                token: theia.CancellationToken
            ): PromiseLike<FoldingRange[] | undefined> {
                return testAPI.$provideFoldingRange(pluginID, document, context, token);
            },
            documentColors(pluginID: string, document: theia.TextDocument, token: theia.CancellationToken): PromiseLike<RawColorInfo[]> {
                return testAPI.$provideDocumentColors(pluginID, document, token);
            },
            renameEdits(pluginID: string, document: theia.TextDocument, position: Position, newName: string,
                token: theia.CancellationToken): PromiseLike<WorkspaceEditDto | undefined> {
                return testAPI.$provideRenameEdits(pluginID, document, position, newName, token);
            }
        };

        return <typeof testservice>{
            languageserver
        };

    };
}
