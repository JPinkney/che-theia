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
import { MAIN_RPC_CONTEXT } from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import {
    CompletionContext,
    CompletionResultDto,
    SignatureHelp,
    Hover,
    DocumentHighlight,
    Range,
    TextEdit,
    FormattingOptions,
    Definition,
    DefinitionLink,
    DocumentLink,
    CodeLensSymbol,
    DocumentSymbol,
    ReferenceContext,
    Location,
    SignatureHelpContext,
    CodeActionContext,
    CodeAction,
    FoldingRange,
} from '@theia/plugin-ext/lib/common/plugin-api-rpc-model';
import { UriComponents } from '@theia/plugin-ext/lib/common/uri-components';
import { CancellationToken, FoldingContext } from '@theia/plugin';
import {
    Position,
    Selection,
    RawColorInfo,
    WorkspaceEditDto
} from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import { SymbolInformation } from 'vscode-languageserver-types';
import { PLUGIN_RPC_CONTEXT, TestMain } from '../common/test-protocol';

export interface TestApiFactory {
    (plugin: Plugin): typeof testservice;
}

export function createAPIFactory(rpc: RPCProtocol): TestApiFactory {

    return function (plugin: Plugin): typeof testservice {

        const testMain = rpc.getProxy(PLUGIN_RPC_CONTEXT.TEST_MAIN) as TestMain;
        const languagesExt = rpc.getProxy(MAIN_RPC_CONTEXT.LANGUAGES_EXT);

        const languageserver: typeof testservice.languageserver = {

            // tslint:disable
            completion(pluginID: string, resource: UriComponents, position: Position, context: CompletionContext, token: CancellationToken): Promise<CompletionResultDto | undefined> {
                return testMain.$findHandleForPluginAndAction(pluginID, 'completion').then(handle => languagesExt.$provideCompletionItems(handle, resource, position, context, token));
            },
            definition(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
                return languagesExt.$provideDefinition(0, resource, position, token);
            },
            declaration(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
                return languagesExt.$provideDeclaration(0, resource, position, token);
            },
            signatureHelp(pluginID: string, resource: UriComponents, position: Position, context: SignatureHelpContext, token: CancellationToken): Promise<SignatureHelp | undefined> {
                return languagesExt.$provideSignatureHelp(0, resource, position, context, token);
            },
            implementation(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
                return languagesExt.$provideImplementation(0, resource, position, token);
            },
            typeDefinition(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
                return languagesExt.$provideTypeDefinition(0, resource, position, token);
            },
            hover(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Hover | undefined> {
                return languagesExt.$provideHover(0, resource, position, token);
            },
            documentHighlight(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<DocumentHighlight[] | undefined> {
                return languagesExt.$provideDocumentHighlights(0, resource, position, token);
            },
            workspaceSymbols(pluginID: string, query: string, token: CancellationToken): PromiseLike<SymbolInformation[]> {
                return languagesExt.$provideWorkspaceSymbols(0, query, token);
            },
            documentFormattingEdits(pluginID: string, resource: UriComponents, options: FormattingOptions, token: CancellationToken): Promise<TextEdit[] | undefined> {
                return languagesExt.$provideDocumentFormattingEdits(0, resource, options, token);
            },
            documentRangeFormattingEdits(pluginID: string, resource: UriComponents, range: Range, options: FormattingOptions, token: CancellationToken): Promise<TextEdit[] | undefined> {
                return languagesExt.$provideDocumentRangeFormattingEdits(0, resource, range, options, token);
            },
            onTypeFormattingEdits(pluginID: string,
                resource: UriComponents,
                position: Position,
                ch: string,
                options: FormattingOptions,
                token: CancellationToken
            ): Promise<TextEdit[] | undefined> {
                return languagesExt.$provideOnTypeFormattingEdits(0, resource, position, ch, options, token);
            },
            documentLinks(pluginID: string, resource: UriComponents, token: CancellationToken): Promise<DocumentLink[] | undefined> {
                return languagesExt.$provideDocumentLinks(0, resource, token);
            },
            codeActions(pluginID: string,
                resource: UriComponents,
                rangeOrSelection: Range | Selection,
                context: CodeActionContext,
                token: CancellationToken
            ): Promise<CodeAction[] | undefined> {
                return languagesExt.$provideCodeActions(0, resource, rangeOrSelection, context, token);
            },
            codeLenses(pluginID: string, resource: UriComponents, token: CancellationToken): Promise<CodeLensSymbol[] | undefined> {
                return languagesExt.$provideCodeLenses(0, resource, token);
            },
            references(pluginID: string, resource: UriComponents, position: Position, context: ReferenceContext, token: CancellationToken): Promise<Location[] | undefined> {
                return languagesExt.$provideReferences(0, resource, position, context, token);
            },
            symbols(pluginID: string, resource: UriComponents, token: CancellationToken): Promise<DocumentSymbol[] | undefined> {
                return languagesExt.$provideDocumentSymbols(0, resource, token);
            },
            documentColors(pluginID: string, resource: UriComponents, token: CancellationToken): PromiseLike<RawColorInfo[]> {
                return languagesExt.$provideDocumentColors(0, resource, token);
            },
            foldingRange(pluginID: string,
                resource: UriComponents,
                context: FoldingContext,
                token: CancellationToken
            ): PromiseLike<FoldingRange[] | undefined> {
                return languagesExt.$provideFoldingRange(0, resource, context, token);
            },
            renameEdits(pluginID: string, resource: UriComponents, position: Position, newName: string, token: CancellationToken): PromiseLike<WorkspaceEditDto | undefined> {
                return languagesExt.$provideRenameEdits(0, resource, position, newName, token);
            }

        };

        return <typeof testservice>{
            languageserver
        };

    };
}
