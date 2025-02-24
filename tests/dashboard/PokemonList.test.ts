import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import List from '@/components/dashboard/List.vue';
import { createRouter, createWebHistory } from 'vue-router';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/dashboard', name: 'dashboard' }]
});

vi.mock('@/components/Favorite.vue', () => ({
  default: {
    props: ['pokemon'],
    template: '<span :id="`favorite_${pokemon.name}`" class="pokemon-item__is-fav">Favorite</span>',
    emits: ['onFavorite'], 
    setup(props, { emit }) {
      return {
        triggerFavorite: () => emit('onFavorite', props.pokemon.name)
      }
    }
  }
}));


vi.unmock('@/components/pokemon/PokemonDetail.vue');

describe('List.vue', () => {

  it('Test: Renderizado de pokemon cuando recibe data', () => {
    const pokemons = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    ];

    const wrapper = mount(List, {
      props: { data: pokemons },
      global: {
        plugins: [router]
      }
    });
    const listItems = wrapper.findAll('.list-item');
    expect(listItems.length).toBe(2);
    expect(listItems[0].text()).toContain('bulbasaur');
    expect(listItems[1].text()).toContain('charmander');
  });

  it('Test: Ver mensaje "Uh-oh!" Cuando no hay información', () => {
    const wrapper = mount(List, {
      props: { data: [] },
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.text()).toContain('Uh-oh!');
    expect(wrapper.text()).toContain('You look lost on your journey!');
    expect(wrapper.find('button').text()).toBe('Go back home');
  });


  it('Test: Evento onFavorite se emite al clickear el componente', async () => {
    const pokemons = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ];
    const wrapper = mount(List, {
      props: { data: pokemons },
      global: {
        plugins: [router]
      }
    });
    
    await wrapper.vm.$nextTick();
    const favoriteComponent = wrapper.findComponent({ name: 'Favorite' });
    expect(favoriteComponent.exists()).toBe(true);
    await favoriteComponent.vm.triggerFavorite();

    expect(wrapper.emitted('onFavorite')).toBeTruthy();
    expect(wrapper.emitted('onFavorite')[0]).toEqual([pokemons[0]]);
  });

  it('Test: Abrir modal cuando el pokemon es seleccionado', async () => {
    const pokemons = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ];
    const wrapper = mount(List, {
      props: { data: pokemons },
      global: {
        plugins: [router],
        stubs: {
          ModalPokemon: true 
        }
      }
    });

    await wrapper.find('.list-item').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'ModalPokemon' }).exists()).toBe(true);
  });

  it('Test: Navegación a vista principal al dar click en el boton "Go back home"', async () => {
    const push = vi.fn();
    router.push = push;

    const wrapper = mount(List, {
      props: { data: [] },
      global: {
        plugins: [router]
      }
    });
    await wrapper.find('button').trigger('click');
    expect(push).toHaveBeenCalledWith({ name: 'home' });
  });
});