import { Musician } from './../interfaces/musician';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Voting, VotingOption } from '../interfaces';

export const TABLE_VOTINGS = 'votings';
export const TABLE_VOTING_OPTIONS = 'voting_options';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  startVoting() {
    return this.supabase.from(TABLE_VOTINGS).insert({
      voting_question: 'My questions',
      description: 'My description',
    });
  }

  async getVotings() {
    const votings = await this.supabase
      .from(TABLE_VOTINGS)
      .select('*')
      .eq('creator_id', this.supabase.auth.user()?.id);
    return votings.data || [];
  }

  async getVotingDetails(id: number) {
    return this.supabase.from(TABLE_VOTINGS).select('*').eq('id', id).single();
  }

  async updateVotingDetails(voting: Voting, id: number) {
    return this.supabase
      .from(TABLE_VOTINGS)
      .update(voting)
      .eq('id', id)
      .single();
  }

  async deleteVoting(id: number) {
    return this.supabase.from(TABLE_VOTINGS).delete().eq('id', id).single();
  }

  async getVotingOptions(votingId: number) {
    return this.supabase
      .from(TABLE_VOTING_OPTIONS)
      .select('*')
      .eq('voting_id', votingId);
  }

  async addVotingOption(option: VotingOption) {
    option.creator_id = this.supabase.auth.user()?.id;
    option.votes = 0;
    delete option.id;

    return this.supabase.from(TABLE_VOTING_OPTIONS).insert(option);
  }

  async updateVotingOption(option: VotingOption) {
    return this.supabase
      .from(TABLE_VOTING_OPTIONS)
      .update({ title: option.title })
      .eq('id', option.id);
  }

  async deleteVotingOption(id: number) {
    return this.supabase
      .from(TABLE_VOTING_OPTIONS)
      .delete()
      .eq('id', id)
      .single();
  }

  async addNewLineToTable(table: string, insert_data: any) {
    const { data, error } = await this.supabase.from(table)
      .insert(insert_data);
    if (error) {
      console.error(error);
    }
    return data || [];
  }

  async getDataFromTable(table: string) {
    const { data, error } = await this.supabase
      .from(table)
      .select('*')
      ;
    if (error) {
      console.error(error);
    }
    return data || [];
  }
  // getDataFromTable(table: string) {
  //   const data = this.supabase
  //     .from(table)
  //     .select('*')
  //     ;
  //   // if (error) {
  //   //   console.error(error);
  //   // }
  //   return data || [];
  // }

  async updateDataOnTable(table: string, insert_data: any, id: number) {
    const { data, error } = await this.supabase
      .from(table)
      .update(insert_data)
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
    }
    return data;
  }


  async deleteDataFromTable(table: string, id: number) {
    const { data, error } = await this.supabase
      .from(table)
      .delete()
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
    }
    return data;
  }

  async getDataDetails(table: string, id: number) {
    const { data, error } = await this.supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
    }
    return data;
  }

}
