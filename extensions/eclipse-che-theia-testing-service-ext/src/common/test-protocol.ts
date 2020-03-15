/*********************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import {
    CompletionContext,
    CompletionResultDto,
    FormattingOptions,
    CodeLensSymbol,
    ReferenceContext,
    SignatureHelpContext,
    FoldingContext,
    DocumentSymbol,
    FoldingRange,
    Location,
    Range,
    CodeActionContext,
    CodeAction,
    DocumentLink,
    TextEdit,
    DocumentHighlight,
    Definition,
    DefinitionLink,
    SignatureHelp,
    Hover
} from '@theia/plugin-ext/lib/common/plugin-api-rpc-model';
import {
    WorkspaceEditDto, RawColorInfo, Selection
} from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import {
    CancellationToken,
    TextDocument
} from '@theia/plugin';
import {
    Position
} from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import {
    SymbolInformation
} from 'vscode-languageserver-types';
import { ProxyIdentifier, createProxyIdentifier } from '@theia/plugin-ext/lib/common/rpc-protocol';

// Expose additional API that allows you to know if a language server is connected and build a map of the language servers
export interface TestAPI {
    $provideCompletionItems(pluginID: string, document: TextDocument, position: Position,
        context: CompletionContext, token: CancellationToken): Promise<CompletionResultDto | undefined>;
    $provideImplementation(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined>;
    $provideTypeDefinition(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined>;
    $provideDefinition(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined>;
    $provideDeclaration(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined>;
    $provideReferences(pluginID: string, document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): Promise<Location[] | undefined>;
    $provideSignatureHelp(
        pluginID: string, document: TextDocument, position: Position, context: SignatureHelpContext, token: CancellationToken
    ): Promise<SignatureHelp | undefined>;
    $provideHover(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Hover | undefined>;
    $provideDocumentHighlights(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<DocumentHighlight[] | undefined>;
    $provideDocumentFormattingEdits(pluginID: string, document: TextDocument,
        options: FormattingOptions, token: CancellationToken): Promise<TextEdit[] | undefined>;
    $provideDocumentRangeFormattingEdits(pluginID: string, document: TextDocument, range: Range,
        options: FormattingOptions, token: CancellationToken): Promise<TextEdit[] | undefined>;
    $provideOnTypeFormattingEdits(
        pluginID: string,
        document: TextDocument,
        position: Position,
        ch: string,
        options: FormattingOptions,
        token: CancellationToken
    ): Promise<TextEdit[] | undefined>;
    $provideDocumentLinks(pluginID: string, document: TextDocument, token: CancellationToken): Promise<DocumentLink[] | undefined>;
    $provideCodeLenses(pluginID: string, document: TextDocument, token: CancellationToken): Promise<CodeLensSymbol[] | undefined>;
    $provideCodeActions(
        pluginID: string,
        document: TextDocument,
        rangeOrSelection: Range | Selection,
        context: CodeActionContext,
        token: CancellationToken
    ): Promise<CodeAction[] | undefined>;
    $provideDocumentSymbols(pluginID: string, document: TextDocument, token: CancellationToken): Promise<DocumentSymbol[] | undefined>;
    $provideWorkspaceSymbols(pluginID: string, query: string, token: CancellationToken): PromiseLike<SymbolInformation[]>;
    $provideFoldingRange(
        pluginID: string,
        document: TextDocument,
        context: FoldingContext,
        token: CancellationToken
    ): PromiseLike<FoldingRange[] | undefined>;
    $provideDocumentColors(pluginID: string, document: TextDocument, token: CancellationToken): PromiseLike<RawColorInfo[]>;
    $provideRenameEdits(pluginID: string, document: TextDocument, position: Position, newName: string, token: CancellationToken): PromiseLike<WorkspaceEditDto | undefined>;
}

export const PLUGIN_RPC_CONTEXT = {
    TEST_API_MAIN: <ProxyIdentifier<TestAPI>>createProxyIdentifier<TestAPI>('TestAPI'),
};
