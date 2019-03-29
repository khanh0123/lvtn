<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
// use CompositeKeyModelHelper;

class User_end_times_episode extends Model
{
	protected $table      = 'user_end_times_episode';
	protected $primaryKey = ['user_id', 'episode_id'];
	public $incrementing  = false;

	/**
	 * Set the keys for a save update query.
	 *
	 * @param  \Illuminate\Database\Eloquent\Builder  $query
	 * @return \Illuminate\Database\Eloquent\Builder
	 */
	protected function setKeysForSaveQuery(\Illuminate\Database\Eloquent\Builder $query)
	{
		$keys = $this->getKeyName();
		if(!is_array($keys)){
			return parent::setKeysForSaveQuery($query);
		}

		foreach($keys as $keyName){
			$query->where($keyName, '=', $this->getKeyForSaveQuery($keyName));
		}

		return $query;
	}
	/**
	 * Get the primary key value for a save query.
	 *
	 * @param mixed $keyName
	 * @return mixed
	 */

	protected function getKeyForSaveQuery($keyName = null)
	{
		if(is_null($keyName)){
			$keyName = $this->getKeyName();
		}

		if (isset($this->original[$keyName])) {
			return $this->original[$keyName];
		}

		return $this->getAttribute($keyName);
	}

	public function get_current_time($episode_id,$user_id)
	{
		return DB::table($this->table)
		->where("user_end_times_episode.user_id",$user_id)
		->where("user_end_times_episode.episode_id",$episode_id)
		->first();
	}

}