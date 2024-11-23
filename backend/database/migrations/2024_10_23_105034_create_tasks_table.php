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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->text('description')->nullable();
            $table->foreignId('project_id')->constrained();
            $table->unsignedBigInteger('doer_id');
            $table->foreign('doer_id')->references('id')->on('users');
            $table->enum('priority', ['low', 'middle', 'high']);
            $table->date('start');
            $table->date('end');
            $table->enum('status', ['created', 'in_process', 'completed'])->default('created');
            $table->json('comments')->nullable();
            $table->datetime('created_at')->useCurrent();

//             	ID (int) - Уникальный идентификатор задачи +
// 	Название (string) - Краткое описание задачи +
// 	Описание (text) - Детальное описание задачи +
// 	Проект (foreign key) - ID проекта, к которому относится задача +
// 	Исполнитель (foreign key) - ID пользователя, ответственного за выполнение задачи +
// руководитель +
// 	Приоритет (enum) - "Низкий", "Средний", "Высокий" (цветовое отображение приоритета) +
// 	Дата начала (date) - Дата начала выполнения задачи +
// 	Дата окончания (date) - Планируемая дата завершения задачи +
// 	Статус (enum) - Статусы задачи: "Назначена", "Выполняется", "Завершена" +
// 	Остаток дней (int) - Количество дней до завершения задачи -

// 	Дата окончания задачи не может быть раньше даты начала
// 	Приоритет задачи указывается при создании
// 	Статус задачи может изменять только руководитель проекта или администратор

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
