<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('boss_id');
            $table->foreign('boss_id')->references('id')->on('users');
            $table->date('start');
            $table->date('end');
            $table->enum('status', ['created', 'in_process', 'completed'])->default('created');
            $table->timestamps();


//             	ID (int) - Уникальный идентификатор проекта +
// 	Название (string) - Название проекта +
// 	Описание (text) - Детальное описание проекта +
// 	Дата начала (date) - Дата начала проекта +
// 	Дата окончания (date) - Дата планируемого окончания проекта +
// 	Статус (enum) - Статусы проекта: "Создан", "В процессе", "Завершён" +
// 	Остаток дней (int) - Количество дней до завершения проекта - 

// o	Ограничения:
// 	Название проекта должно быть уникальным +
// 	Дата окончания не может быть раньше даты начала

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
