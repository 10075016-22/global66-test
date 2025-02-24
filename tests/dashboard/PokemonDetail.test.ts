import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, computed } from 'vue';

const mockGetPokemonDetail = vi.fn().mockImplementation(async (name: string) => {
  const pokemonDetail = {
    name,
    weight: 69,
    height: 7,
    types: [{ type: { name: 'grass' } }],
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        }
      }
    }
  };
  return Promise.resolve(pokemonDetail);
});


vi.mock('@/composables/usePokemon', () => {
  const selectedPokemon = ref({
    name: '',
    weight: 0,
    height: 0,
    types: [],
    sprites: { other: { 'official-artwork': { front_default: '' } } }
  });

  const cmpTypesSelected = computed(() => 
    selectedPokemon.value.types.map(t => t.type.name).join(', ')
  );

  return {
    cmpPokemon: () => ({
      onGetPokemonDetail: async (name: string) => {
        const data = await mockGetPokemonDetail(name);
        selectedPokemon.value = data;
        return data;
      },
      selectedPokemon,
      cmpTypesSelected
    })
  };
});

import PokemonDetail from '@/components/pokemon/PokemonDetail.vue';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

describe('PokemonDetail.vue', () => {
  const pokemonData = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    id: 1,
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        }
      }
    },
    types: [{ type: { name: 'grass' } }],
    stats: [
      { base_stat: 45, stat: { name: 'hp' } },
      { base_stat: 49, stat: { name: 'attack' } }
    ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Test: Cargar información del pokemon correctamente', async () => {    
    const wrapper = mount(PokemonDetail, {
      props: {
        pokemon: pokemonData,
        showModal: true,
        modelValue: true 
      },
      global: {
        stubs: {
          'pokemon-stats': true,
          'pokemon-types': true,
          Dialog: true,
          DialogPanel: true,
          TransitionChild: true,
          TransitionRoot: true
        }
      }
    });

    await wrapper.vm.$nextTick();
    await mockGetPokemonDetail.mock.results[0].value;
    await wrapper.vm.$nextTick();

    expect(mockGetPokemonDetail).toHaveBeenCalledWith('bulbasaur');
    expect(mockGetPokemonDetail).toHaveBeenCalledTimes(1);

    expect(wrapper.find('[id^="dialog_"]').attributes('id')).toBe('dialog_bulbasaur');
    
    const dialog = wrapper.find(`#dialog_${pokemonData.name}`);
    expect(dialog.exists()).toBe(true);
  });

  it('Test: Copiar información al portapapeles', async () => {
    let clipboardText = '';
    const mockClipboard = {
      writeText: vi.fn().mockImplementation((text) => {
        clipboardText = text;
        return Promise.resolve();
      })
    };
    Object.assign(navigator, { clipboard: mockClipboard });
    
    const el = document.createElement('div');
    el.id = 'modal';
    document.body.appendChild(el);

    const wrapper = mount(PokemonDetail, {
      props: {
        pokemon: pokemonData,
        showModal: true,
        modelValue: true 
      },
      attachTo: document.body,
      global: {
        stubs: {
          'pokemon-stats': true,
          'pokemon-types': true
        }
      }
    });

    await wrapper.vm.$nextTick();
    
    try {
      const copyButton = document.querySelector('#CopyClipboard') as HTMLButtonElement;
      expect(copyButton).toBeTruthy();
      
      await copyButton.click();
      await wrapper.vm.$nextTick();
      
      const expectedText = 'Name: bulbasaur, Weight: 69, Height: 7, Types: grass';
      expect(clipboardText).toBe(expectedText);
      
    } finally {
      wrapper.unmount();
      document.body.removeChild(el);
    }
  });
}); 