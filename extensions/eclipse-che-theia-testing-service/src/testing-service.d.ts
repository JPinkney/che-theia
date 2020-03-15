/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc.
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

import { TextDocument } from '@theia/plugin';
import {
    CompletionResultDto, DocumentSymbol, FoldingRange, Location, Range, CodeActionContext, CodeAction, DocumentLink, TextEdit,
    DocumentHighlight, Definition, DefinitionLink, SignatureHelp, Hover
} from '@theia/plugin-ext/lib/common/plugin-api-rpc-model';
import {
    SymbolInformation
} from 'vscode-languageserver-types';
import {
    Position,
    Selection
} from '@theia/plugin-ext/lib/common/plugin-api-rpc';

declare module '@eclipse-che/testing-service' {

    export { TextDocument } from '@theia/plugin';
    export {
        CompletionResultDto, DocumentSymbol, FoldingRange, Location, Range, CodeActionContext, CodeAction, DocumentLink, TextEdit,
        DocumentHighlight, Definition, DefinitionLink, SignatureHelp, Hover
    } from '@theia/plugin-ext/lib/common/plugin-api-rpc-model';
    export {
        SymbolInformation
    } from 'vscode-languageserver-types';
    export {
        Position,
        Selection
    } from '@theia/plugin-ext/lib/common/plugin-api-rpc';

    export namespace languageserver {
        export function completion(pluginID: string, document: TextDocument, position: Position,
            context: CompletionContext, token: CancellationToken): Promise<CompletionResultDto | undefined>;
        export function implementation(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined>;
        export function typeDefinition(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined>;
        export function definition(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined>;
        export function declaration(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined>;
        export function references(pluginID: string, document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): Promise<theia.Location[] | undefined>;
        export function signatureHelp(
            pluginID: string, document: TextDocument, position: Position, context: SignatureHelpContext, token: CancellationToken
        ): Promise<SignatureHelp | undefined>;
        export function hover(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Hover | undefined>;
        export function documentHighlights(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<DocumentHighlight[] | undefined>;
        export function documentFormattingEdits(pluginID: string, document: TextDocument,
            options: FormattingOptions, token: CancellationToken): Promise<TextEdit[] | undefined>;
        export function documentRangeFormattingEdits(pluginID: string, document: TextDocument, range: theia.Range,
            options: FormattingOptions, token: CancellationToken): Promise<theia.TextEdit[] | undefined>;
        export function onTypeFormattingEdits(
            pluginID: string,
            document: TextDocument,
            position: Position,
            ch: string,
            options: FormattingOptions,
            token: CancellationToken
        ): Promise<TextEdit[] | undefined>;
        export function documentLinks(pluginID: string, document: TextDocument, token: CancellationToken): Promise<DocumentLink[] | undefined>;
        export function codeLenses(pluginID: string, document: TextDocument, token: CancellationToken): Promise<CodeLensSymbol[] | undefined>;
        export function codeActions(
            pluginID: string,
            document: TextDocument,
            rangeOrSelection: theia.Range | theia.Selection,
            context: theia.CodeActionContext,
            token: CancellationToken
        ): Promise<theia.CodeAction[] | undefined>;
        export function documentSymbols(pluginID: string, document: TextDocument, token: CancellationToken): Promise<DocumentSymbol[] | undefined>;
        export function workspaceSymbols(pluginID: string, query: string, token: CancellationToken): PromiseLike<SymbolInformation[]>;
        export function foldingRange(
            pluginID: string,
            document: TextDocument,
            context: FoldingContext,
            token: CancellationToken
        ): PromiseLike<FoldingRange[] | undefined>;
        export function documentColors(pluginID: string, document: TextDocument, token: CancellationToken): PromiseLike<RawColorInfo[]>;
        export function renameEdits(pluginID: string, document: TextDocument, position: Position, newName: string, token: CancellationToken): PromiseLike<WorkspaceEditDto | undefined>;
    }

}
