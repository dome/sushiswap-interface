import Button from '../../../../components/Button'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import TridentLayout from '../../../../layouts/Trident'
import Typography from '../../../../components/Typography'
import { toHref } from '../../../../hooks/useTridentPools'
import HybridZapMode from '../../../../features/trident/add/hybrid/HybridZapMode'
import HybridStandardMode from '../../../../features/trident/add/hybrid/HybridStandardMode'
import AddTransactionReviewModal from '../../../../features/trident/add/AddTransactionReviewModal'
import React from 'react'
import SettingsTab from '../../../../components/Settings'
import TridentAddHybridContextProvider from '../../../../features/trident/add/hybrid/context'
import { LiquidityMode } from '../../../../features/trident/types'
import ModeToggle from '../../../../features/trident/ModeToggle'
import DepositSubmittedModal from '../../../../features/trident/DepositSubmittedModal'
import { useTridentContext, useTridentState } from '../../../../features/trident/context'
import { HybridPoolContext, HybridPoolState } from '../../../../features/trident/add/hybrid/context/types'

const AddHybrid = () => {
  const { i18n } = useLingui()
  const { liquidityMode } = useTridentState<HybridPoolState>()
  const { pool } = useTridentContext<HybridPoolContext>()

  return (
    <div className="flex flex-col w-full mt-px mb-5">
      <div className="flex flex-col p-5 bg-dark-800 bg-auto bg-bubble-pattern bg-opacity-60 gap-4">
        <div className="flex flex-row justify-between">
          <Button
            color="blue"
            variant="outlined"
            size="sm"
            className="rounded-full py-1 pl-2"
            startIcon={<ChevronLeftIcon width={24} height={24} />}
          >
            <Link href={`/trident/pool/${toHref(pool)}`}>{i18n._(t`Back`)}</Link>
          </Button>
          {liquidityMode === LiquidityMode.ZAP && <SettingsTab />}
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="h2" weight={700} className="text-high-emphesis">
            {i18n._(t`Add Liquidity`)}
          </Typography>
          <Typography variant="sm">
            {i18n._(
              t`Deposit all pool tokens directly with Standard mode, or invest & rebalance with any asset in Zap mode.`
            )}
          </Typography>
        </div>

        {/*spacer*/}
        <div className="h-2" />
      </div>

      <ModeToggle />

      <div className="flex flex-col mt-6">
        {liquidityMode === LiquidityMode.ZAP && <HybridZapMode />}
        {liquidityMode === LiquidityMode.STANDARD && <HybridStandardMode />}
      </div>

      <AddTransactionReviewModal />
      <DepositSubmittedModal />
    </div>
  )
}

AddHybrid.Layout = TridentLayout
AddHybrid.Provider = TridentAddHybridContextProvider

export default AddHybrid
