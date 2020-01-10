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

import { PluginHandleRegistry } from './plugin-handle-registry';
import { interfaces } from 'inversify';
import { TestAPI } from '../common/test-protocol';
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
import { SymbolInformation } from 'vscode-languageserver-types';
import {
    Position,
    Selection,
    RawColorInfo,
    WorkspaceEditDto
} from '@theia/plugin-ext/lib/common/plugin-api-rpc';

export class TestAPIImpl implements TestAPI {

    private readonly pluginHandleRegistry: PluginHandleRegistry;

    constructor(container: interfaces.Container) {
        this.pluginHandleRegistry = container.get(PluginHandleRegistry);
    }

    $provideCompletionItems(pluginID: string, resource: UriComponents, position: Position,
        context: CompletionContext, token: CancellationToken): Promise<CompletionResultDto | undefined> {

        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'completion').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideCompletionItems(potentialLanguagesMain.handle, resource, position, context, token);
            }
            return undefined;
        });
    }

    $provideDefinition(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'definition').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideDefinition(potentialLanguagesMain.handle, resource, position, token);
            }
            return undefined;
        });
    }

    $provideDeclaration(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'declaration').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideDeclaration(potentialLanguagesMain.handle, resource, position, token);
            }
        });
    }

    $provideSignatureHelp(pluginID: string, resource: UriComponents, position: Position, context: SignatureHelpContext, token: CancellationToken
    ): Promise<SignatureHelp | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'signatureHelp').then(potentialLanguageMain => {
            if (potentialLanguageMain) {
                return potentialLanguageMain.languagesMain.$provideSignatureHelp(potentialLanguageMain.handle, resource, position, context, token);
            }
            return Promise.resolve(undefined);
        });
    }

    $provideImplementation(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'implementation').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideImplementation(potentialLanguagesMain.handle, resource, position, token);
            }
        });
    }

    $provideTypeDefinition(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Definition | DefinitionLink[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'typeDefinition').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideTypeDefinition(potentialLanguagesMain.handle, resource, position, token);
            }
        });
    }

    $provideHover(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<Hover | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'hover').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideHover(potentialLanguagesMain.handle, resource, position, token);
            }
        });
    }

    $provideDocumentHighlights(pluginID: string, resource: UriComponents, position: Position, token: CancellationToken): Promise<DocumentHighlight[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'documentHighlight').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideDocumentHighlights(potentialLanguagesMain.handle, resource, position, token);
            }
        });
    }

    $provideWorkspaceSymbols(pluginID: string, query: string, token: CancellationToken): PromiseLike<SymbolInformation[]> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'workspaceSymbols').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideWorkspaceSymbols(potentialLanguagesMain.handle, query, token);
            }
            return [];
        });
    }

    $provideDocumentFormattingEdits(pluginID: string, resource: UriComponents,
        options: FormattingOptions, token: CancellationToken): Promise<TextEdit[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'documentFormattingEdits').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideDocumentFormattingEdits(potentialLanguagesMain.handle, resource, options, token);
            }
        });
    }

    // tslint:disable-next-line:no-any
    $provideDocumentRangeFormattingEdits(pluginID: string, resource: UriComponents, range: Range,
        options: FormattingOptions, token: CancellationToken): Promise<TextEdit[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'documentRangeFormattingEdits').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideDocumentRangeFormattingEdits(potentialLanguagesMain.handle, resource, range, options, token);
            }
        });
    }

    $provideOnTypeFormattingEdits(pluginID: string,
        resource: UriComponents,
        position: Position,
        ch: string,
        options: FormattingOptions,
        token: CancellationToken
    ): Promise<TextEdit[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'onTypeFormattingEdits').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideOnTypeFormattingEdits(potentialLanguagesMain.handle, resource, position, ch, options, token);
            }
        });
    }

    $provideDocumentLinks(pluginID: string, resource: UriComponents, token: CancellationToken): Promise<DocumentLink[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'documentLinks').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideDocumentLinks(potentialLanguagesMain.handle, resource, token);
            }
            return Promise.resolve(undefined);
        });
    }

    // tslint:disable-next-line:no-any
    $provideCodeActions(pluginID: string,
        resource: UriComponents,
        rangeOrSelection: Range | Selection,
        context: CodeActionContext,
        token: CancellationToken
    ): Promise<CodeAction[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'codeActions').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideCodeActions(potentialLanguagesMain.handle, resource, rangeOrSelection, context, token);
            }
            return undefined;
        });
    }

    $provideCodeLenses(pluginID: string, resource: UriComponents, token: CancellationToken): Promise<CodeLensSymbol[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'codeLenses').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideCodeLenses(potentialLanguagesMain.handle, resource, token);
            }
            return undefined;
        });
    }

    $provideReferences(pluginID: string, resource: UriComponents, position: Position, context: ReferenceContext, token: CancellationToken): Promise<Location[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'references').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideReferences(potentialLanguagesMain.handle, resource, position, context, token);
            }
            return undefined;
        });
    }

    $provideDocumentColors(pluginID: string, resource: UriComponents, token: CancellationToken): PromiseLike<RawColorInfo[]> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'documentColors').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideDocumentColors(potentialLanguagesMain.handle, resource, token);
            }
            return [];
        });
    }

    $provideFoldingRange(pluginID: string,
        resource: UriComponents,
        context: FoldingContext,
        token: CancellationToken
    ): PromiseLike<FoldingRange[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'foldingRange').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideFoldingRange(potentialLanguagesMain.handle, resource, context, token);
            }
            return undefined;
        });
    }

    $provideRenameEdits(pluginID: string, resource: UriComponents, position: Position, newName: string, token: CancellationToken): PromiseLike<WorkspaceEditDto | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'renameEdits').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideRenameEdits(potentialLanguagesMain.handle, resource, position, newName, token);
            }
            return undefined;
        });
    }

    $provideDocumentSymbols(pluginID: string, resource: UriComponents, token: CancellationToken): Promise<DocumentSymbol[] | undefined> {
        return this.pluginHandleRegistry.lookupLanguagesMainForPluginAndAction(pluginID, 'symbols').then(potentialLanguagesMain => {
            if (potentialLanguagesMain) {
                return potentialLanguagesMain.languagesMain.$provideDocumentSymbols(potentialLanguagesMain.handle, resource, token);
            }
            return undefined;
        });
    }
}
