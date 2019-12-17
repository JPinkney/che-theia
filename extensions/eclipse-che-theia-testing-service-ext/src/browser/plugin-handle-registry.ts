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

import { injectable } from 'inversify';
import { LanguagesMainTest, LanguageServerAction } from './languages-test-main';

/**
 * This class keeps a registry of which plugins map to which handle
 */

export interface LanguageFeatureRegistrant {
    languagesMainImpl: LanguagesMainTest; // The languagesMain that registered this plugin in the registry
    action: Map<LanguageServerAction, number>; // A map of language actions to their handle
}

@injectable()
export class PluginHandleRegistry {
    pluginRegistrationMap: Map<string, LanguageFeatureRegistrant> = new Map();
}
