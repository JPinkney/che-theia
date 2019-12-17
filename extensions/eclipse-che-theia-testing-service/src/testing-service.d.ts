/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
declare module '@eclipse-che/testing-service' {

    export namespace languageserver {
        // tslint:disable
        export function completion(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.CompletionList>;
        export function definition(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition>;
        export function declaration(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition>;
        export function signatureHelp(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.SignatureHelpContext, token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.SignatureHelpResult>>;
        export function implementation(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition>;
        export function typeDefinition(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Definition>;
        export function hover(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Hover>;
        export function documentHighlight(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.DocumentHighlight[]>;
        export function workspaceSymbols(pluginID: string, query: { query: string }, token: monaco.CancellationToken): Thenable<vst.SymbolInformation[]>;
        export function documentFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, options: monaco.languages.FormattingOptions, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]>;
        export function documentRangeFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, range: Range, options: monaco.languages.FormattingOptions, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]>;
        export function onTypeFormattingEdits(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, ch: string, options: monaco.languages.FormattingOptions, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.TextEdit[]>;
        export function documentLinks(pluginID: string, model: monaco.editor.ITextModel, token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.ILinksList>>;
        export function codeActions(pluginID: string, model: monaco.editor.ITextModel, rangeOrSelection: Range, context: monaco.languages.CodeActionContext, token: monaco.CancellationToken): Promise<monaco.languages.CodeActionList | Promise<monaco.languages.CodeActionList>>;
        export function codeLenses(pluginID: string, model: monaco.editor.ITextModel, token: monaco.CancellationToken): Promise<monaco.languages.ProviderResult<monaco.languages.CodeLensList>>;
        export function references(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.ReferenceContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.Location[]>
        export function symbols(pluginID: string, model: monaco.editor.ITextModel, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.DocumentSymbol[]>;
        export function documentColors(pluginID: string, model: monaco.editor.ITextModel, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.IColorInformation[]>;
        export function foldingRange(pluginID: string, model: monaco.editor.ITextModel, context: monaco.languages.FoldingContext, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.FoldingRange[]>;
        export function renameEdits(pluginID: string, model: monaco.editor.ITextModel, position: monaco.Position, newName: string, token: monaco.CancellationToken): monaco.languages.ProviderResult<monaco.languages.WorkspaceEdit & monaco.languages.Rejection>;
    }

}
