'use client'

import { sepolia, mainnet } from '@starknet-react/chains'
import { 
    StarknetConfig, 
    publicProvider,
    argent,
    braavos,
    useInjectedConnectors,
    voyager,
    injected
} from '@starknet-react/core'
import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";

export function StarknetProvider({
    children}: {children: 
        React.ReactNode}) {

    const { connectors: injected } = useInjectedConnectors({
        recommended: [argent(), braavos()],
        includeRecommended: 'always',
        order: 'alphabetical',
    })

    const connectors = [
        ...injected,
        new InjectedConnector({options: {id: "okxwallet", name: "OKX Wallet"}}),
        new WebWalletConnector({ url: "https://web.argent.xyz" }),
        new ArgentMobileConnector(),
    ]

    return (
        <StarknetConfig
            chains={[mainnet, sepolia]}
            provider={publicProvider()}
            connectors={connectors}
            explorer={voyager}
        >
            {children}
        </StarknetConfig>
    )
}