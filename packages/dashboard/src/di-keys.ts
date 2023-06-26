import type { InjectionKey } from 'vue'
import type { useErc721Drop } from '@nftfy/common'
import type { Project } from '@nftfy/common/collections'

export const ERC721DropKey = Symbol('ERC721Drop') as InjectionKey<
  ReturnType<typeof useErc721Drop>
>
export const ProjectKey = Symbol('Project') as InjectionKey<Project>
