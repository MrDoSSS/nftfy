import { ethers } from 'hardhat'

async function main() {
  const contract = await ethers.deployContract('ERC721Factory')
  await contract.waitForDeployment()

  console.log(await contract.getAddress())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
