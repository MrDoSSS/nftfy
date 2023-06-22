import 'dotenv/config'
import { ethers } from 'hardhat'

// 910
// 418 + 82 + 119

async function main() {
  const contract = await ethers.getContractAt(
    'ERC721Drop',
    '0xbf9fBFf01664500A33080Da5d437028b07DFcC55'
  )

  const supply = 200
  const maxPerWallet = 6
  const freePerWallet = 0
  const price = ethers.parseEther('0.0015')

  await contract.setMaxTotalSupply(3000)

  await contract.setMintRules({
    supply,
    maxPerWallet,
    freePerWallet,
    price,
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
