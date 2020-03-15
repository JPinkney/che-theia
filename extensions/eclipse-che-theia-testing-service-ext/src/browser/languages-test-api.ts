/*********************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { PluginHandleRegistry } from './plugin-handle-registry';
import { interfaces } from 'inversify';
import { TestAPI } from '../common/test-protocol';
import {
    TextDocument,
    CancellationToken,
    CompletionContext,
    ReferenceContext,
    SignatureHelpContext,
    FormattingOptions,
    FoldingContext
} from '@theia/plugin';
import {
    Position,
    Selection
} from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import {
    RawColorInfo,
    WorkspaceEditDto
} from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import {
    CompletionResultDto,
    SignatureHelp,
    Hover,
    Range,
    TextEdit,
    Location,
    DocumentHighlight,
    DocumentLink,
    CodeAction,
    DocumentSymbol,
    FoldingRange,
    CodeActionContext,
    CodeLensSymbol,
    Definition,
    DefinitionLink
} from '@theia/plugin-ext/lib/common/plugin-api-rpc-model';
import { SymbolInformation } from 'vscode-languageserver-types';

/**
 * This class redirects language api requests to the correct sidecars and returns the results
 */
export class TestAPIImpl implements TestAPI {

    private readonly pluginHandleRegistry: PluginHandleRegistry;

    constructor(container: interfaces.Container) {
        this.pluginHandleRegistry = container.get(PluginHandleRegistry);
    }

    async $provideCompletionItems(pluginID: string, document: TextDocument, position: Position,
        context: CompletionContext, token: CancellationToken): Promise<CompletionResultDto | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'completion');
        return languagesExt.$provideCompletionItems(handle, document.uri, position, context, token);
    }

    async $provideDefinition(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'definition');
        return languagesExt.$provideDefinition(handle, document.uri, position, token);
    }

    async $provideDeclaration(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'declaration');
        return languagesExt.$provideDeclaration(handle, document.uri, position, token);
    }

    async $provideSignatureHelp(pluginID: string, document: TextDocument, position: Position, context: SignatureHelpContext, token: CancellationToken
    ): Promise<SignatureHelp | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'signatureHelp');
        return languagesExt.$provideSignatureHelp(handle, document.uri, position, context, token);
    }

    async $provideImplementation(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'implementation');
        return languagesExt.$provideImplementation(handle, document.uri, position, token);
    }

    async $provideTypeDefinition(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'typeDefinition');
        return languagesExt.$provideTypeDefinition(handle, document.uri, position, token);
    }

    async $provideHover(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<Hover | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'hover');
        return languagesExt.$provideHover(handle, document.uri, position, token);
    }

    async $provideDocumentHighlights(pluginID: string, document: TextDocument, position: Position, token: CancellationToken): Promise<DocumentHighlight[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'documentHighlight');
        return languagesExt.$provideDocumentHighlights(handle, document.uri, position, token);
    }

    $provideWorkspaceSymbols(pluginID: string, query: string, token: CancellationToken): PromiseLike<SymbolInformation[]> {
        return this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'workspaceSymbols').then(({ languagesExt, handle }) =>
            languagesExt.$provideWorkspaceSymbols(handle, query, token)
        );
    }

    async $provideDocumentFormattingEdits(pluginID: string, document: TextDocument,
        options: FormattingOptions, token: CancellationToken): Promise<TextEdit[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'documentFormattingEdits');
        return languagesExt.$provideDocumentFormattingEdits(handle, document.uri, options, token);
    }

    // tslint:disable-next-line:no-any
    async $provideDocumentRangeFormattingEdits(pluginID: string, document: TextDocument, range: Range,
        options: FormattingOptions, token: CancellationToken): Promise<TextEdit[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'documentRangeFormattingEdits');
        return languagesExt.$provideDocumentRangeFormattingEdits(handle, document.uri, range, options, token);
    }

    async $provideOnTypeFormattingEdits(pluginID: string,
        document: TextDocument,
        position: Position,
        ch: string,
        options: FormattingOptions,
        token: CancellationToken
    ): Promise<TextEdit[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'onTypeFormattingEdits');
        return languagesExt.$provideOnTypeFormattingEdits(handle, document.uri, position, ch, options, token);
    }

    async $provideDocumentLinks(pluginID: string, document: TextDocument, token: CancellationToken): Promise<DocumentLink[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'documentLinks');
        return languagesExt.$provideDocumentLinks(handle, document.uri, token);
    }

    // tslint:disable-next-line:no-any
    async $provideCodeActions(pluginID: string,
        document: TextDocument,
        rangeOrSelection: Range | Selection,
        context: CodeActionContext,
        token: CancellationToken
    ): Promise<CodeAction[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'codeActions');
        return languagesExt.$provideCodeActions(handle, document.uri, rangeOrSelection, context, token);
    }

    async $provideCodeLenses(pluginID: string, document: TextDocument, token: CancellationToken): Promise<CodeLensSymbol[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'codeLenses');
        return languagesExt.$provideCodeLenses(handle, document.uri, token);
    }

    async $provideReferences(pluginID: string, document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): Promise<Location[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'references');
        return languagesExt.$provideReferences(handle, document.uri, position, context, token);
    }

    $provideDocumentColors(pluginID: string, document: TextDocument, token: CancellationToken): PromiseLike<RawColorInfo[]> {
        return this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'documentColors').then(({ languagesExt, handle }) =>
            languagesExt.$provideDocumentColors(handle, document.uri, token)
        );
    }

    $provideFoldingRange(pluginID: string,
        document: TextDocument,
        context: FoldingContext,
        token: CancellationToken
    ): PromiseLike<FoldingRange[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'foldingRange').then(({ languagesExt, handle }) =>
            languagesExt.$provideFoldingRange(handle, document.uri, context, token)
        );
    }

    $provideRenameEdits(pluginID: string, document: TextDocument, position: Position, newName: string, token: CancellationToken): PromiseLike<WorkspaceEditDto | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'renameEdits').then(({ languagesExt, handle }) =>
            languagesExt.$provideRenameEdits(handle, document.uri, position, newName, token)
        );
    }

    async $provideDocumentSymbols(pluginID: string, document: TextDocument, token: CancellationToken): Promise<DocumentSymbol[] | undefined> {
        const { languagesExt, handle } = await this.pluginHandleRegistry.lookupLanguagesExtForPluginAndAction(pluginID, 'symbols');
        return languagesExt.$provideDocumentSymbols(handle, document.uri, token);
    }
}
