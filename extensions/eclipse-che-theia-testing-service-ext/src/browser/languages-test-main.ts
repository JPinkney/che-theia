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
import { PluginInfo, LanguagesExt, MAIN_RPC_CONTEXT } from '@theia/plugin-ext/lib/common/plugin-api-rpc';
import { SerializedDocumentFilter } from '@theia/plugin-ext/lib/common/plugin-api-rpc-model';
import { LanguagesMainImpl } from '@theia/plugin-ext/lib/main/browser/languages-main';
import * as theia from '@theia/plugin';
import { PluginHandleRegistry } from './plugin-handle-registry';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';

export type LanguageServerAction = string;
export type LanguageServerActions =
    'completion' |
    'definition' |
    'declaration' |
    'signatureHelp' |
    'implementation' |
    'typeDefinition' |
    'hover' |
    'documentHighlight' |
    'workspaceSymbols' |
    'documentFormattingEdits' |
    'documentRangeFormattingEdits' |
    'onTypeFormattingEdits' |
    'documentLinks' |
    'codeActions' |
    'codeLenses' |
    'references' |
    'symbols' |
    'documentColors' |
    'foldingRange' |
    'renameEdits';

@injectable()
export class LanguagesMainTestImpl extends LanguagesMainImpl {

    @inject(PluginHandleRegistry)
    private readonly pluginHandleRegistry: PluginHandleRegistry;

    private readonly languagesExtProxy: LanguagesExt;

    constructor(@inject(RPCProtocol) rpc: RPCProtocol) {
        super(rpc);
        this.languagesExtProxy = rpc.getProxy(MAIN_RPC_CONTEXT.LANGUAGES_EXT);
    }

    // tslint:disable
    $registerCompletionSupport(handle: number, pluginInfo: PluginInfo,
        selector: SerializedDocumentFilter[], triggerCharacters: string[], supportsResolveDetails: boolean): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'completion');
        super.$registerCompletionSupport(handle, pluginInfo, selector, triggerCharacters, supportsResolveDetails);
    }

    $registerDefinitionProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'definition');
        super.$registerDefinitionProvider(handle, pluginInfo, selector);
    }

    $registerDeclarationProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'declaration');
        super.$registerDeclarationProvider(handle, pluginInfo, selector);
    }

    $registerReferenceProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'references');
        super.$registerReferenceProvider(handle, pluginInfo, selector);
    }

    $registerSignatureHelpProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[], metadata: theia.SignatureHelpProviderMetadata): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'signatureHelp');
        super.$registerSignatureHelpProvider(handle, pluginInfo, selector, metadata);
    }

    $registerImplementationProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'implementation');
        super.$registerImplementationProvider(handle, pluginInfo, selector);
    }

    $registerTypeDefinitionProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'typeDefinition');
        super.$registerTypeDefinitionProvider(handle, pluginInfo, selector);
    }

    $registerHoverProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'hover');
        super.$registerHoverProvider(handle, pluginInfo, selector);
    }

    $registerDocumentHighlightProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'documentHighlight');
        super.$registerDocumentHighlightProvider(handle, pluginInfo, selector);
    }

    $registerWorkspaceSymbolProvider(handle: number, pluginInfo: PluginInfo): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'workspaceSymbols');
        super.$registerWorkspaceSymbolProvider(handle, pluginInfo);
    }

    $registerDocumentLinkProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'documentLinks');
        super.$registerDocumentLinkProvider(handle, pluginInfo, selector);
    }

    $registerCodeLensSupport(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[], eventHandle: number): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'codeLenses');
        super.$registerCodeLensSupport(handle, pluginInfo, selector, eventHandle);
    }

    $registerOutlineSupport(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'symbols');
        super.$registerOutlineSupport(handle, pluginInfo, selector);
    }

    $registerDocumentFormattingSupport(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'documentFormattingEdits');
        super.$registerDocumentFormattingSupport(handle, pluginInfo, selector);
    }

    $registerRangeFormattingProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'documentRangeFormattingEdits');
        super.$registerRangeFormattingProvider(handle, pluginInfo, selector);
    }

    $registerOnTypeFormattingProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[], autoFormatTriggerCharacters: string[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'onTypeFormattingEdits');
        super.$registerOnTypeFormattingProvider(handle, pluginInfo, selector, autoFormatTriggerCharacters);
    }

    $registerFoldingRangeProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'foldingRange');
        super.$registerFoldingRangeProvider(handle, pluginInfo, selector);
    }

    $registerDocumentColorProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[]): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'documentColors');
        super.$registerDocumentColorProvider(handle, pluginInfo, selector);
    }

    $registerRenameProvider(handle: number, pluginInfo: PluginInfo, selector: SerializedDocumentFilter[], supportsResolveLocation: boolean): void {
        this.registerPluginWithFeatureHandle(handle, pluginInfo.id, 'renameEdits');
        super.$registerRenameProvider(handle, pluginInfo, selector, supportsResolveLocation);
    }

    private registerPluginWithFeatureHandle(handle: number, extensionId: string, newlyRegisteredAction: string): void {
        if (this.pluginHandleRegistry.pluginRegistrationMap.has(extensionId)) {
            (this.pluginHandleRegistry.pluginRegistrationMap.get(extensionId) as any).action.set(newlyRegisteredAction, handle);
        } else {
            this.pluginHandleRegistry.pluginRegistrationMap.set(extensionId,
                {
                    providerHandles: new Map().set(newlyRegisteredAction, handle),
                    languagesMainImpl: this.languagesExtProxy
                });
        }
    }

}
