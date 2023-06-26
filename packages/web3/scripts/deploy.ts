import { ethers } from 'hardhat'

async function main() {
  const ERC721Drop = await ethers.deployContract('ERC721Drop')
  await ERC721Drop.waitForDeployment()

  console.log(await ERC721Drop.getAddress())

  const ERC721Factory = await ethers.deployContract('ERC721Factory')
  await ERC721Factory.waitForDeployment()

  console.log(await ERC721Factory.getAddress())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
