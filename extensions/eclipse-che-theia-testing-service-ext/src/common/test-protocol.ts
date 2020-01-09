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
import * as vst from 'vscode-languageserver-types';

// Expose additional API that allows you to know if a language server is connected and build a map of the language servers
export interface LanguagesMainTest {
    // tslint:disable-next-line:no-any
    $provideCompletionItems(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        context: monaco.languages.CompletionContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.CompletionList>;
    $provideDocumentSymbols(pluginID: string, model: monaco.editor.ITextModel, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.DocumentSymbol[]>;

    $provideDefinition(pluginID: string, model: monaco.editor.ITextModel,
        position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition>

    $provideDeclaration(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition>

    $provideSignatureHelp(pluginID: string, model: monaco.editor.ITextModel,
        position: monaco.Position, token: monaco.CancellationToken,
        context: monaco.languages.SignatureHelpContext): Promise<monaco.languages.ProviderResult<monaco.languages.SignatureHelpResult>>

    $provideImplementation(pluginID: string, model: monaco.editor.ITextModel,
        position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition>

    $provideTypeDefinition(pluginID: string, model: monaco.editor.ITextModel,
        position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition>

    $provideHover(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Hover>

    $provideDocumentHighlights(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.DocumentHighlight[]>

    $provideWorkspaceSymbols(pluginID: string, params: { query: string }, token: monaco.CancellationToken): Thenable<vst.SymbolInformation[]>

    $provideDocumentFormattingEdits(pluginID: string, model: monaco.editor.ITextModel,
        options: monaco.languages.FormattingOptions, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]>

    $provideDocumentRangeFormattingEdits(pluginID: string, model: monaco.editor.ITextModel,
        range: Range, options: monaco.languages.FormattingOptions, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]>

    $provideOnTypeFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        ch: string, options: monaco.languages.FormattingOptions, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]>
    $provideLinks(pluginID: string, model: monaco.editor.ITextModel,
        token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.ILinksList>>

    $provideCodeActions(pluginID: string, model: monaco.editor.ITextModel,
        rangeOrSelection: Range, context: monaco.languages.CodeActionContext,
        token: monaco.CancellationToken): Promise<monaco.languages.CodeActionList | Promise<monaco.languages.CodeActionList>>

    $provideCodeLenses(pluginID: string, model: monaco.editor.ITextModel,
        token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.CodeLensList>>

    $provideReferences(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position,
        context: monaco.languages.ReferenceContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Location[]>

    $provideDocumentColors(pluginID: string, model: monaco.editor.ITextModel,
        token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.IColorInformation[]>

    $provideFoldingRanges(pluginID: string, model: monaco.editor.ITextModel,
        context: monaco.languages.FoldingContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.FoldingRange[]>

    $provideRenameEdits(pluginID: string, model: monaco.editor.ITextModel,
        position: monaco.Position, newName: string, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.WorkspaceEdit & monaco.languages.Rejection>
}
