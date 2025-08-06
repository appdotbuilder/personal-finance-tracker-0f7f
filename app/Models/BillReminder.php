<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\BillReminder
 *
 * @property int $id
 * @property int $user_id
 * @property int $category_id
 * @property string $name
 * @property float $amount
 * @property \Illuminate\Support\Carbon $due_date
 * @property string $frequency
 * @property bool $is_paid
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Category $category
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder query()
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereIsPaid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillReminder whereUserId($value)
 * @method static \Database\Factories\BillReminderFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BillReminder extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'amount',
        'due_date',
        'frequency',
        'is_paid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'is_paid' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the bill reminder.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category for the bill reminder.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}